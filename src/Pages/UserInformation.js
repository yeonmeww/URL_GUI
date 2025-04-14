// React 및 훅(hooks) import
import React, { useState, useEffect } from 'react';
// 스타일 시트 import
import './Code.css';
// Table 컴포넌트 import - 사용자 목록을 테이블 형식으로 출력
import Table from './Table';
// Info 컴포넌트 import - 사용자 입력 폼 관련 컴포넌트
import Info from './Info';

// UserInformation 컴포넌트 정의
const UserInformation = () => {
  // 폼에 표시할 필드 정의
  const infoFields = ['id', 'name','institution','email','phone'];
  
  // 테이블에 표시할 헤더 정의
  const tableHeaders = ['id', 'name','institution','email','phone'];
  
  // 사용자 정보 상태 초기화 (입력 폼용)
  const [userInfo, setUserInfo] = useState(
    infoFields.reduce((obj, field) => ({...obj, [field]: ''}), {})
  );
  
  // 전체 사용자 목록 상태 (테이블 데이터용)
  const [users, setUsers] = useState([]);
  
  // 컴포넌트가 처음 렌더링될 때 실행되는 useEffect 훅
  useEffect(() => {
    // JSON 파일에서 사용자 데이터 fetch
    fetch('/UserInformation.json')
      .then((response) => response.json())
      .then((data) => {
        // 필요한 속성만 필터링하여 테이블 데이터 준비
        const filteredUsers = data.user.map((user, index) => {
          const filteredUser = { Id: index + 1 }; // 임의 ID 생성
          
          // 테이블 헤더에 정의된 필드만 추출
          tableHeaders.forEach(header => {
            if (header !== 'Id') { // Id는 이미 설정했으므로 제외
              filteredUser[header] = user[header] || '';
            }
          });
          
          return filteredUser;
        });
        setUsers(filteredUsers);
      })
      .catch((error) => console.error('Error loading user data:', error));
  }, [tableHeaders]); // tableHeaders가 변경되면 다시 실행
  
  // 사용자 정보 저장 버튼 클릭 시 호출되는 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('정보가 저장되었습니다!');
    console.log('저장된 정보:', userInfo);
  };
  
  // 컴포넌트 UI 반환
  return (
    <div className="user-info">
      {/* 동적 필드를 가진 Info 컴포넌트 */}
      <Info 
        userInfo={userInfo} 
        setUserInfo={setUserInfo} 
        onSubmit={handleSubmit}
        fields={infoFields} // 동적으로 필드 전달
      />
      
      <div className="data-content">
        <section className="user-table">
          {/* 동적 헤더와 데이터를 가진 Table 컴포넌트 */}
          <Table headers={tableHeaders} data={users} />
        </section>
      </div>
    </div>
  );
};

export default UserInformation;