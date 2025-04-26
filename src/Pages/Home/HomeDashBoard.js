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

    // Custom legend names mapping
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
                    <div className="centered-section">
                        <BarChartComponent 
                            data={TopData} 
                            legendNames={legendNamesMapping} // Pass the legend names here
                        />
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
                    <h4><b>News!</b></h4>
                    <div className="news-box" />
                </div>
                <div className="news-section">
                    <h4><b>News!</b></h4>
                    <div className="news-box" />
                </div>
            </div>
        </div>
    );
};

export default HomeDashBoard;