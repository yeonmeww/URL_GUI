import React, { useState, useEffect } from 'react';
import './MaterialCode.css';
import Info from '../../Info'; // Info 컴포넌트를 Pages 폴더에서 불러옴
import Table from '../../Table'; // Table 컴포넌트를 Pages 폴더에서 불러옴

const MaterialAliasForm = () => {
  // alias 정보를 담을 상태 초기화
  const [aliasInfo, setAliasInfo] = useState({
    materialId: '',
    materialAlias: '',
    aliasType: '',
    defaultAlias: ''
  });

  // alias 리스트를 담을 상태
  const [alias, setAlias] = useState([]);

  // 컴포넌트가 마운트될 때 JSON 파일로부터 데이터 불러오기
  useEffect(() => {
    fetch('./AliasInformation.json')
      .then((response) => response.json())
      .then((data) => {
        setAlias(data.alias); // 불러온 데이터를 alias 상태에 저장
      })
      .catch((error) => console.error('Error loading alias data:', error));
  }, []);

  // 폼 제출 이벤트 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 제출 동작 막기
    alert('정보가 저장되었습니다!');
  };

  // Info 컴포넌트에 전달할 필드 목록 정의
  const fields = [
    'materialId', 
    'materialAlias', 
    'aliasType'
  ];

  // dropdown 필드를 위한 커스텀 렌더 함수
  const customFieldRender = (field, value, onChange) => {
    if (field === 'defaultAlias') {
      return (
        <select 
          name="defaultAlias" 
          id="defaultAlias"
          value={value} 
          onChange={onChange} 
          required
        >
          <option value="">Y/N</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }
    return null;
  };

  // 추가 필드 정의 (커스텀 렌더링 포함)
  const additionalFields = [
    { 
      id: 'defaultAlias', 
      label: 'Default Alias?', // 필드 라벨
      customRender: true // 커스텀 렌더링 사용 여부
    }
  ];

  // 테이블 헤더 정의
  const headers = [
    'Alias Id', 
    'Material Id', 
    'Material Alias', 
    'Alias Type', 
    'Is Default'
  ];

  // 테이블에 표시할 데이터 변환
  const tableData = alias.map(item => ({
    'Alias Id': item.aliasId || '',
    'Material Id': item.materialId,
    'Material Alias': item.materialAlias,
    'Alias Type': item.aliasType,
    'Is Default': item.isDefault
  }));

  return (
    <div className="material-info">
      {/* Info 컴포넌트를 사용한 입력 폼 */}
      <Info 
        userInfo={aliasInfo} 
        setUserInfo={setAliasInfo} 
        onSubmit={handleSubmit}
        fields={fields}
        additionalFields={additionalFields}
        customFieldRender={customFieldRender}
        formClassName="material-form"
        buttonConfig={{
          showSearch: true, // 검색 버튼 표시 여부
          showSave: true,   // 저장 버튼 표시 여부
          showDelete: true  // 삭제 버튼 표시 여부
        }}
      />
      
      <div className="data-content">
        <section className="material-table">
          {/* Table 컴포넌트를 사용한 데이터 출력 */}
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

export default MaterialAliasForm;
