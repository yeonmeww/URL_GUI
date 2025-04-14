import React, { useState, useEffect } from 'react';
import './ProAnaSimulCode.css';
import Info from '../../Info'; // Info 컴포넌트 불러오기
import Table from '../../Table'; // Table 컴포넌트 불러오기

const AnalysisCodeForm = () => {
  const [analysisInfo, setAnalysisInfo] = useState({
    analysisId: '',
    analysisName: '',
    analysisPurpose: '',
    appClass1: '',
    appClass2: '',
    appClass3: '',
    equipId: '',
  });
  
  const [analysis, setAnalysis] = useState([]);

  useEffect(() => {
    fetch('./AnalysisInformation.json')
      .then((response) => response.json())
      .then((data) => {
        setAnalysis(data.analysis);
      })
      .catch((error) => console.error('Error loading analysis data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('정보가 저장되었습니다!');
  };

  const fields = [
    'analysisId',
    'analysisName',
    'analysisPurpose',
    'appClass1',
    'appClass2',
    'appClass3',
    'equipId'
  ];

  const headers = [
    'Analysis Id',
    'Analysis Name',
    'Analysis Purpose',
    'App Class 1',
    'App Class 2',
    'App Class 3',
    'Equipment Id'
  ];

  const tableData = analysis.map(item => ({
    'Analysis Id': item.analysisId,
    'Analysis Name': item.analysisName,
    'Analysis Purpose': item.analysisPurpose,
    'App Class 1': item.AppClass1,
    'App Class 2': item.AppClass2,
    'App Class 3': item.AppClass3,
    'Equipment Id': item.EquipId
  }));

  return (
    <div className="material-info">
      <Info 
        userInfo={analysisInfo}
        setUserInfo={setAnalysisInfo}
        onSubmit={handleSubmit}
        fields={fields}
        formClassName="material-form"
        buttonConfig={{
          showSearch: true,
          showSave: true,
          showDelete: true
        }}
      />
      
      <div className="data-content">
        <section className="material-table">
          <Table 
            headers={headers}
            data={tableData}
            containerClassName="table-container"
            tableClassName="table"
          />
        </section>
      </div>
    </div>
  );
};

export default AnalysisCodeForm;
