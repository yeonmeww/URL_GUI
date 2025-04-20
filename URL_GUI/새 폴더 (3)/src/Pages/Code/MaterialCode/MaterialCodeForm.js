import React, { useState, useEffect } from 'react';
import './MaterialCode.css';
import Info from '../../Info'; // Info 컴포넌트 불러오기
import Table from '../../Table'; // Table 컴포넌트 불러오기

const MaterialCodeForm = () => {
  // 입력 폼에 사용될 상태(state) 초기화
  const [codeInfo, setCodeInfo] = useState({
    materialName: '',
    materialGroup: '',
    chemicalFormula: '',
    applicationClass1: '',
    materialType: '',
    applicationClass2: '', 
    materialForm: '',
    applicationClass3: ''
  });
  
  // JSON 파일에서 불러온 코드 데이터를 저장할 상태
  const [code, setCode] = useState([]);

  // 컴포넌트가 마운트될 때 JSON 데이터 불러오기
  useEffect(() => {
    fetch('./CodeInformation.json') // 같은 경로에 있는 JSON 파일 읽기
      .then((response) => response.json())
      .then((data) => {
        setCode(data.code); // 데이터에서 code 배열을 상태에 저장
      })
      .catch((error) => console.error('코드 데이터를 불러오는 중 오류 발생:', error));
  }, []);

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
    alert('정보가 저장되었습니다!');
  };

  // Info 컴포넌트에서 사용할 필드 목록
  const fields = [
    'materialName', 
    'materialGroup', 
    'chemicalFormula', 
    'applicationClass1', 
    'applicationClass2', 
    'applicationClass3'
  ];

  // 드롭다운 등 커스텀 필드를 렌더링하기 위한 함수
  const customFieldRender = (field, value, onChange) => {
    if (field === 'materialType') {
      return (
        <select 
          name="materialType" 
          id="materialType"
          value={value} 
          onChange={onChange} 
          required
        >
          <option value="">Select Type</option>
          <option value="Raw">Raw</option>
          <option value="Product">Product</option>
        </select>
      );
    } else if (field === 'materialForm') {
      return (
        <select 
          name="materialForm" 
          id="materialForm"
          value={value} 
          onChange={onChange} 
          required
        >
          <option value="">Select Form</option>
          <option value="Powder">Powder</option>
          <option value="Liquid">Liquid</option>
          <option value="Slurry">Slurry</option>
          <option value="Pellet">Pellet</option>
        </select>
      );
    }
    return null;
  };

  // Info 컴포넌트에서 사용할 추가 필드 정의 (커스텀 렌더링 포함)
  const additionalFields = [
    { 
      id: 'materialType', 
      label: 'Material Type',
      customRender: true
    },
    { 
      id: 'materialForm', 
      label: 'Material Form',
      customRender: true
    }
  ];

  // 테이블에 사용할 헤더 정의
  const headers = [
    'Material Id', 
    'Chemical Name', 
    'Material Chemical Formula', 
    'Material Group Id', 
    'Material Type', 
    'Material Form', 
    'Application Class 1', 
    'Application Class 2', 
    'Application Class 3', 
    'Role'
  ];

  // JSON 데이터(code 배열)를 테이블 형식에 맞게 변환
  const tableData = code.map(item => ({
    'Material Id': item.materialName,
    'Chemical Name': item.chemicalFormula,
    'Material Chemical Formula': item.materialType,
    'Material Group Id': item.materialGroup,
    'Material Type': item.materialType,
    'Material Form': item.materialForm || '',
    'Application Class 1': item.applicationClass1,
    'Application Class 2': item.applicationClass2 || '',
    'Application Class 3': item.applicationClass3 || '',
    'Role': item.role
  }));

  return (
    <div className="material-info">
      {/* Info 컴포넌트를 사용하여 입력 폼 표시 */}
      <Info 
        userInfo={codeInfo} 
        setUserInfo={setCodeInfo} 
        onSubmit={handleSubmit}
        fields={fields}
        additionalFields={additionalFields}
        customFieldRender={customFieldRender}
        formClassName="material-form"
        buttonConfig={{
          showSearch: true,  // 검색 버튼 표시
          showSave: true,    // 저장 버튼 표시
          showDelete: true   // 삭제 버튼 표시
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

export default MaterialCodeForm;
