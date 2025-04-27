import React, { useState, useEffect } from 'react';
import BarChartComponent from './BarChartComponent';
import './HomeDashBoard.css';
import LineChart from './LineChart';

const HomeDashBoard = () => {
    const [TopData, setTopData] = useState(null);
    const [ImageData, setImageData] = useState(null);
    const [WorkOrderData, setWorkOrderData] = useState(null);
    const [BinaryFileData, setBinaryFileData] = useState(null);
    const [RecipeData, setRecipeData] = useState(null);

    // News 관련 상태 추가
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

    // ⏰ 3초마다 상단 뉴스가 변경
    useEffect(() => {
        const topNewsInterval = setInterval(() => {
            setCurrentTopNewsIndex(prevIndex => (prevIndex + 1) % topNewsList.length);
        }, 3000); // 상단 뉴스 3초마다 변경

        return () => {
            clearInterval(topNewsInterval);
        };
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
            <div className="main-panel">
                <h3 className="dashboard-title">Data Dash Board</h3>
                {TopData && (
                    <div className="totaldata-section">
                        <BarChartComponent data={TopData} legendNames={legendNamesMapping} />
                    </div>
                )}
                {ImageData && (
                    <div className="centered-section">
                        <h4>월별 Image Data 수 집계</h4>
                        <LineChart data={ImageData} />
                    </div>
                )}
                {WorkOrderData && (
                    <div className="centered-section">
                        <h4>월별 Work Order 실행 수 집계</h4>
                        <LineChart data={WorkOrderData} />
                    </div>
                )}
                {BinaryFileData && (
                    <div className="centered-section">
                        <h4>월별 Binary File 수 집계</h4>
                        <LineChart data={BinaryFileData} />
                    </div>
                )}
                {RecipeData && (
                    <div className="centered-section">
                        <h4>월별 Process Recipe 수 집계</h4>
                        <LineChart data={RecipeData} />
                    </div>
                )}
            </div>
            <div className="side-panel">
                <div className="news-section">
                    <h3 className="dashboard-title">News</h3>
                    <div className="news-box-top">
                        <div className="news-text">
                            {topNewsList[currentTopNewsIndex]}
                        </div>
                    </div>
                </div>
                <div className="news-section">
                    <h3 className="dashboard-title"></h3>
                    <div className="news-box-bottom">
                        <div className="news-text">
                            {bottomNewsList.map((news, index) => (
                                <p key={index}>{news}</p> // 각각의 뉴스 항목을 <p>로 나열
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeDashBoard;
