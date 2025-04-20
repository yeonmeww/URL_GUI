import React, { useState, useEffect } from 'react';
import './MaterialCode.css';
import Info from '../../Info'; // Pages 폴더에서 Info 컴포넌트 불러오기
import Table from '../../Table'; // Pages 폴더에서 Table 컴포넌트 불러오기

const MaterialAliasForm = () => {
  // 입력 폼에서 사용할 상태 (그룹 이름과 화학식)
  const [aliasInfo, setAliasInfo] = useState({
    groupName: '',
    chemicalFormula: '',
  });
  
  // 테이블에 출력할 alias(별칭) 리스트 상태
  const [alias, setAlias] = useState([]);

  // 컴포넌트가 처음 마운트될 때 JSON 파일에서 alias 데이터 불러오기
  useEffect(() => {
    fetch('./AliasInformation.json')
      .then((response) => response.json())
      .then((data) => {
        setAlias(data.alias); // 불러온 데이터를 상태에 저장
      })
      .catch((error) => console.error('Error loading alias data:', error));
  }, []);

  // 폼 제출 이벤트 처리
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 form 제출 동작 막기
    alert('정보가 저장되었습니다!'); // 저장 완료 알림
  };

  // Info 컴포넌트에 전달할 필드 정의
  // 주의: 필드 이름은 정확히 상태 객체 키(`aliasInfo`)와 일치해야 함
  const fields = [
    'groupName',  // 그룹 이름
    'chemicalFormula' // 화학식
  ];

  // alias 데이터를 테이블 형식으로 변환
  const tableData = alias.map(item => ({
    'Material Group Id': item.materialGroupId || '', // 그룹 ID
    'Material Group Name': item.materialGroupName || '' // 그룹 이름
  }));

  // 테이블에 사용할 헤더 정의
  const headers = [
    'Material Group Id', 
    'Material Group Name'
  ];

  return (
    <div className="material-info">
      {/* Info 컴포넌트를 사용한 입력 폼 영역 */}
      <Info 
        userInfo={aliasInfo} // 상태 전달
        setUserInfo={setAliasInfo} // 상태 변경 함수 전달
        onSubmit={handleSubmit} // 제출 이벤트 함수 전달
        fields={fields} // 입력 필드 설정
        formClassName="material-form" // CSS 클래스
        buttonConfig={{ // 버튼 설정
          showSearch: true,
          showSave: true,
          showDelete: true
        }}
      />
      
      <div className="data-content">
        <section className="material-table">
          {/* Table 컴포넌트를 사용한 테이블 출력 */}
          <Table 
            headers={headers} // 테이블 헤더
            data={tableData} // 출력할 데이터
            containerClassName="table-container" // 테이블 컨테이너 클래스
            tableClassName="table" // 테이블 자체 클래스
          />
        </section>
      </div>
    </div>
  );
};

export default MaterialAliasForm;
