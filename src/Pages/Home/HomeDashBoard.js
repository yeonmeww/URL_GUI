import React, { useState, useEffect } from 'react';
import BarChartComponent from './BarChartComponent';
import LineChart from './LineChart';
import './HomeDashBoard.css';

const HomeDashBoard = () => {
    const [TopData, setTopData] = useState(null);
    const [ImageData, setImageData] = useState(null);
    const [WorkOrderData, setWorkOrderData] = useState(null);
    const [BinaryFileData, setBinaryFileData] = useState(null);
    const [RecipeData, setRecipeData] = useState(null);

    const topNewsList = [
        '📢 금오공대 Binary File Data 생성 최다!',
        '📢 홍익대 Image File Data 생성 최다!',
        '📢 성균관대 Work Order 생성 최다!',
        '📢 성균관대 Process Recipe 생성 최다!'
    ];

    const bottomNewsList = [
        '🔔 서버 점검 예정 : 5월 2일 (목) 00:00~04:00',
        '📢 신규 기능 업데이트 : 이미지 업로드 개선',
        '📰 새로운 대시보드 기능 추가 예정!',
        '📣 긴급 공지 : 일부 기능 일시 중단 안내',
        '🔔 긴급 공지: 데이터베이스 점검 예정'
    ];

    const [currentTopNewsIndex, setCurrentTopNewsIndex] = useState(0);

    useEffect(() => {
        const topNewsInterval = setInterval(() => {
            setCurrentTopNewsIndex(prevIndex => (prevIndex + 1) % topNewsList.length);
        }, 3000);
        return () => clearInterval(topNewsInterval);
    }, [topNewsList.length]);

    useEffect(() => {
        fetch('/TotalData.json')
            .then(res => res.json())
            .then(setTopData)
            .catch(err => console.error('TotalData.json 로딩 실패:', err));
        fetch('/ImageData.json')
            .then(res => res.json())
            .then(setImageData)
            .catch(err => console.error('ImageData.json 로딩 실패:', err));
        fetch('/WorkOrderData.json')
            .then(res => res.json())
            .then(setWorkOrderData)
            .catch(err => console.error('WorkOrderData.json 로딩 실패:', err));
        fetch('/BinaryFileData.json')
            .then(res => res.json())
            .then(setBinaryFileData)
            .catch(err => console.error('BinaryFileData.json 로딩 실패:', err));
        fetch('/RecipeData.json')
            .then(res => res.json())
            .then(setRecipeData)
            .catch(err => console.error('RecipeData.json 로딩 실패:', err));
    }, []);

    const legendNamesMapping = {
        'Image': 'Image 수',
        'Work_Order': 'WorkOrder 실행 수',
        'Binary_File': 'Binary File 수',
        'Process_Recipe': 'ProcessRecipe 수'
    };

    return (
        <div className="HomeDashBoard-container">
            {/* 상단: 그래프 + 테이블 */}
            <div className="top-section">
                <div className="top-left">
                    {TopData && (
                        <div className="centered-section">
                            {/* <h4>Data Dashboard</h4> */}
                            <BarChartComponent data={TopData} legendNames={legendNamesMapping} />
                        </div>
                    )}
                </div>
                <div className="top-right">
                    {TopData && (
                        <div className="table-section">
                             {/* <h4 className="table-title">기관별 데이터 테이블</h4> */}
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>기관명</th>
                                        <th>Image</th>
                                        <th>Work Order</th>
                                        <th>Binary File</th>
                                        <th>Process Recipe</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TopData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.Institution}</td>
                                            <td>{item.Image}</td>
                                            <td>{item.Work_Order}</td>
                                            <td>{item.Binary_File}</td>
                                            <td>{item.Process_Recipe}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* 중간: 2x2 창문형 그래프 */}
            <div className="middle-section">
                {ImageData && (
                    <div className="middle-chart">
                        <h4>월별 Image Data 수</h4>
                        <LineChart data={ImageData} />
                    </div>
                )}
                {WorkOrderData && (
                    <div className="middle-chart">
                        <h4>월별 Work Order 실행 수</h4>
                        <LineChart data={WorkOrderData} />
                    </div>
                )}
                {BinaryFileData && (
                    <div className="middle-chart">
                        <h4>월별 Binary File 수</h4>
                        <LineChart data={BinaryFileData} />
                    </div>
                )}
                {RecipeData && (
                    <div className="middle-chart">
                        <h4>월별 Process Recipe 수</h4>
                        <LineChart data={RecipeData} />
                    </div>
                )}
            </div>

            {/* 하단: 뉴스 */}
            <div className="bottom-news-section">
                <div className="news-column">
                    <div className="news-box">
                        <span className="news-text">{topNewsList[currentTopNewsIndex]}</span>
                    </div>
                </div>
                <div className="news-column">
                    <div className="news-box">
                        <div className="news-text">
                            {bottomNewsList.map((news, index) => (
                                <p key={index}>{news}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeDashBoard;
