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
  const [activeTab, setActiveTab] = useState('image');

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
    { title: 'HONGIK UNIVERSITY', value: '440', subtitle: 'IMAGE GENERATION' },
    { title: 'HANYANG UNIVERSITY', value: '620', subtitle: 'BINARY FILE GENERATION' },
    { title: 'KOREA UNIVERSITY', value: '800', subtitle: 'BINARY FILE GENERATION' },
    { title: 'PUSAN NATIONAL UNIVERSITY', value: '880', subtitle: 'BINARY FILE GENERATION' },
    { title: 'INCHEON UNIVERSITY', value: '500', subtitle: 'BINARY FILE  GENERATION' },
    { title: 'KIST', value: '620', subtitle: 'BINARY FILE GENERATION' }
  ];

  const legendNamesMapping = {
    'Image': 'Image',
    'Work_Order': 'Work Order',
    'Binary_File': 'Binary File',
    'Process_Recipe': 'Process Recipe'
  };

  const tabOptions = [
    { key: 'image', label: '월별 Image Data 수', data: ImageData },
    { key: 'workOrder', label: '월별 Work Order 실행 수', data: WorkOrderData },
    { key: 'binary', label: '월별 Binary File 수', data: BinaryFileData },
    { key: 'recipe', label: '월별 Process Recipe 수', data: RecipeData }
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

  const renderActiveChart = () => {
    const active = tabOptions.find(tab => tab.key === activeTab);
    return active?.data && <LineChart data={active.data} />;
  };

  return (
    <div className="HomeDashBoard-container">
      <section className="hero-section">
        <div className="gradient-overlay" />
        <div className="hero-content">
          {TopData && (
            <div className="chart-wrapper">
              <BarChartComponent data={TopData} legendNames={legendNamesMapping} />
            </div>
          )}
          <div className="text-grid">
            {textCards.map((card, idx) => (
                <div key={idx} className="text-card fade-in-up">
                <div className="card-title">{card.title}</div>
                <div className="card-value">{card.value}</div>
                <div className="card-subtitle">{card.subtitle}</div>
                </div>
            ))}
            </div>
        </div>
      </section>

      <section className="news-section">
        <div className="news-title">News</div>
        <div className="top-news">
          <span>{topNewsList[currentTopNewsIndex]}</span>
        </div>
        <div className="bottom-news slide-in">
            {bottomNewsList.map((news, index) => (
                <p key={index}>{news}</p>
            ))}
            </div>
      </section>

      <section className="middle-section">
        <div className="tab-buttons-vertical">
          {tabOptions.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={activeTab === tab.key ? 'active-tab' : ''}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="middle-chart">
          {renderActiveChart()}
        </div>
      </section>
      <div className="institution-row-wrapper">
        <div className="institution-row">
          <img src={require('./kier.jpg')} alt="KIER" />
          <img src={require('./kist.jpg')} alt="KIST" />
          <img src={require('./sk.jpg')} alt="성균관대" />
          <img src={require('./korea.jpg')} alt="고려대" />
          <img src={require('./hy.jpg')} alt="한양대" />
          <img src={require('./pn.jpg')} alt="부산대" />
          <img src={require('./kit.jpg')} alt="금오공대" />
          <img src={require('./INU.jpg')} alt="인천대" />
          <img src={require('./h.jpg')} alt="홍익대" />
        </div>
      </div>


    </div>
  );
};

export default HomeDashBoard;
