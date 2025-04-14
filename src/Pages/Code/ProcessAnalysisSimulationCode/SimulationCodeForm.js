import React, { useState, useEffect } from 'react';
import './ProAnaSimulCode.css';
import Info from '../../Info'; // Info 컴포넌트 불러오기
import Table from '../../Table'; // Table 컴포넌트 불러오기

const SimulationCodeForm = () => {
  const [simulationInfo, setSimulationInfo] = useState({
    simulationId: '',
    simulationName: '',
    simulationPurpose: '',
    simulationType: '',
    simulationAppClass1: '',
    simulationAppClass2: '',
    simulationAppClass3: ''
  });
  
  const [simulation, setSimulation] = useState([]);

  useEffect(() => {
    fetch('./SimulationInformation.json')
      .then((response) => response.json())
      .then((data) => {
        setSimulation(data.simulation);
      })
      .catch((error) => console.error('Error loading simulation data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('정보가 저장되었습니다!');
  };

  // Info 컴포넌트에서 사용할 필드 목록
  const fields = [
    'simulationId',
    'simulationName',
    'simulationPurpose',
    'simulationType',
    'simulationAppClass1',
    'simulationAppClass2',
    'simulationAppClass3'
  ];

  // 테이블에 사용할 헤더 정의
  const headers = [
    'Simulation Id',
    'Simulation Name',
    'Simulation Purpose',
    'Simulation Type',
    'App Class 1',
    'App Class 2',
    'App Class 3'
  ];

  // JSON 데이터를 테이블 형식에 맞게 변환
  const tableData = simulation.map(item => ({
    'Simulation Id': item.simulationId,
    'Simulation Name': item.simulationName,
    'Simulation Purpose': item.simulationPurpose,
    'Simulation Type': item.simulationType,
    'App Class 1': item.simulationAppClass1,
    'App Class 2': item.simulationAppClass2,
    'App Class 3': item.simulationAppClass3
  }));

  return (
    <div className="material-info">
      {/* Info 컴포넌트를 사용하여 입력 폼 표시 */}
      <Info 
        userInfo={simulationInfo}
        setUserInfo={setSimulationInfo}
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
          {/* Table 컴포넌트를 사용하여 데이터 테이블 표시 */}
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

export default SimulationCodeForm;
