import React, { useState, useEffect } from 'react';
import './EquipmentCode.css';

// UserInformation 컴포넌트
const EquipmentCode = () => {
  // 상태 관리: 사용자 정보
  const [userInfo, setUserInfo] = useState({
    id: '',
    email: '',
    name: '',
    phone: '',
    institution: ''
  });
  
  // 상태 관리: 사용자 데이터 목록
  const [users, setUsers] = useState([]);

  // 상태 관리: 테이블 데이터 로드
  useEffect(() => {
    // JSON 파일에서 데이터 가져오기
    fetch('/UserInformation.json')  // user.json 파일이 공개 폴더에 있어야 정상적으로 동작합니다.
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.user);  // JSON에서 유저 데이터를 가져와 상태에 저장
      })
      .catch((error) => console.error('Error loading user data:', error));
  }, []);  // 빈 배열을 두면 컴포넌트 마운트 시 한 번만 실행됩니다.

  // 폼 값 변경 핸들러
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 처리 (예: API 호출)
    alert('정보가 저장되었습니다!');
  };

  return (
    <div className="user-info">
      <div className="info-content">
      <div className="info-box">
        {/* User Information Form */}
        <form className="user-form" onSubmit={handleSubmit}>
          {['id', 'App Class 1', 'name', 'App Class 2', 'provider Id', 'App Class 3', 'provider Name'].map((field) => (
            <div className="info-form-group" key={field}>
              <div className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</div>
              <div className="form-input">
                <input
                  type="text"
                  id={field}
                  value={userInfo[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          ))}
          
        </form>
      </div>
          
      <div className="button-content">
          <button type="search" className="btn-search">Search</button>
          <button type="submit" className="btn-save">Save</button>
          <button type="delete" className="btn-delete">Delete</button>
      </div>
      </div>
       <div className="data-content">
        {/* User Data Table */}
        <section className="user-table">
		
		<div class="table-container">
			  <table className="table">
				<thead>
				  <tr>
					<th>ID</th>
					<th>Name</th>
					<th>Institution</th>
					<th>E-mail</th>
					<th>Phone</th>
					<th>Role</th>
				  </tr>
				</thead>
				<tbody>
				  {users.map((equipCode) => (
					<tr key={equipCode.id}>
					  <td>{equipCode.id}</td>
					  <td>{equipCode.name}</td>
					  <td>{equipCode.institution}</td>
					  <td>{equipCode.email}</td>
					  <td>{equipCode.phone}</td>
					  <td>{equipCode.role}</td>
					</tr>
				  ))}
				</tbody>
			  </table>
		  </div>
        </section>
      </div>
    </div>
  );
};

export default EquipmentCode;
