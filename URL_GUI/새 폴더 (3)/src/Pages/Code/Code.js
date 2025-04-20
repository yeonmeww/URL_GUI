// React 및 훅(hooks) import
import React, { useState, useEffect } from 'react';

// 스타일 시트 import
import './Code.css';

// Table 컴포넌트 import - 사용자 목록을 테이블 형식으로 출력
import Table from '../Table';

// Info 컴포넌트 import - 사용자 입력 폼 관련 컴포넌트
import Info from '../Info';

// UserInformation 컴포넌트 정의
const UserInformation = () => {
  // 사용자 정보 상태 초기화 (입력 폼용)
  const [userInfo, setUserInfo] = useState({
    id: '',
    email: '',
    name: '',
    phone: '',
    institution: ''
  });
  
  // 전체 사용자 목록 상태 (테이블 데이터용)
  const [users, setUsers] = useState([]);

  // 컴포넌트가 처음 렌더링될 때 실행되는 useEffect 훅
  useEffect(() => {
    // JSON 파일에서 사용자 데이터 fetch
    fetch('/UserInformation.json')
      .then((response) => response.json()) // 응답을 JSON 형태로 변환
      .then((data) => {
        setUsers(data.user); // JSON 객체에서 user 배열을 추출하여 상태에 저장
      })
      .catch((error) => console.error('Error loading user data:', error)); // 에러 처리
  }, []); // 빈 의존성 배열: 마운트 시 한 번만 실행됨

  // 사용자 정보 저장 버튼 클릭 시 호출되는 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    alert('정보가 저장되었습니다!'); // 알림 표시
  };

  // 테이블의 헤더 항목 정의
  const headers = ['ID', 'Name', 'Institution', 'E-mail', 'Phone', 'Role'];

  // 컴포넌트 UI 반환
  return (
    <div className="user-info">
      {/* 사용자 입력 폼 컴포넌트 - 상태와 핸들러 props로 전달 */}
      <Info 
        userInfo={userInfo} 
        setUserInfo={setUserInfo} 
        onSubmit={handleSubmit}
      />
      
      <div className="data-content">
        {/* 사용자 목록 테이블 섹션 */}
        <section className="user-table">
          {/* Table 컴포넌트에 헤더와 데이터 전달 */}
          <Table headers={headers} data={users} />
        </section>
      </div>
    </div>
  );
};

// 컴포넌트 export
export default UserInformation;
