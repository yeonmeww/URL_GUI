
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
    const [currentTopNewsIndex, setCurrentTopNewsIndex] = useState(0);

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

    const textCards = [
        {
          title: '2025 HONGIK UNIVERSITY',
          value: '500',
          subtitle: 'IMAGE GENERATION',
        },
        {
          title: '할말이 없넹',
          value: '$19,491',
          subtitle: 'AFTER FINANCIAL AID',
        },
        {
          title: '2020 DEFAULT RATE',
          value: '0.0563%',
          subtitle: 'ON STUDENT LOANS',
        },
        {
          title: '2022 ACCEPTANCE RATE',
          value: '3.24%',
          subtitle: '61,221 APPLICANTS',
        },
        {
          title: '2022 ENROLLED STUDENTS',
          value: '30,631',
          subtitle: '69.2% FULL-TIME',
        },
        {
          title: '2022 GRADUATION RATE',
          value: '97.8%',
          subtitle: '1,622 GRADUATES',
        }
      ];
      

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTopNewsIndex(prev => (prev + 1) % topNewsList.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch('/TotalData.json').then(res => res.json()).then(setTopData);
        fetch('/ImageData.json').then(res => res.json()).then(setImageData);
        fetch('/WorkOrderData.json').then(res => res.json()).then(setWorkOrderData);
        fetch('/BinaryFileData.json').then(res => res.json()).then(setBinaryFileData);
        fetch('/RecipeData.json').then(res => res.json()).then(setRecipeData);
    }, []);

    const legendNamesMapping = {
        'Image': 'Image 수',
        'Work_Order': 'WorkOrder 실행 수',
        'Binary_File': 'Binary File 수',
        'Process_Recipe': 'ProcessRecipe 수'
    };

    return (
        <div className="HomeDashBoard-container">
            <div className="hero-section">
                <div className="gradient-overlay" />
                <div className="hero-content">
                    {TopData && (
                        <div className="chart-wrapper enlarged">
                            <BarChartComponent data={TopData} legendNames={legendNamesMapping} />
                        </div>
                    )}
                    <div className="text-grid">
                        {textCards.map((card, idx) => (
                            <div key={idx} className="text-card">
                                <div className="card-title">{card.title}</div>
                                <div className="card-value">{card.value}</div>
                                <div className="card-subtitle">{card.subtitle}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="news-section">
                <div className="top-news">
                    <span>{topNewsList[currentTopNewsIndex]}</span>
                </div>
                <div className="bottom-news">
                    {bottomNewsList.map((news, index) => (
                        <p key={index}>{news}</p>
                    ))}
                </div>
            </div>

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
        </div>
    );
};

export default HomeDashBoard;