import React from 'react';
import './Info.css';

// 더 유연한 Info 컴포넌트
const Info = ({ 
  userInfo, 
  setUserInfo, 
  onSubmit,
  fields = [], // 사용할 필드를 동적으로 받음
  formClassName = "user-form",
  buttonConfig = {
    showSearch: true,
    showSave: true,
    showDelete: true
  }
}) => {
  // 폼 입력값 변경 핸들러
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    } else {
      alert('정보가 저장되었습니다!');
    }
  };

  // 필드 레이블 포맷팅
  const formatLabel = (field) => {
    return field.charAt(0).toUpperCase() + field.slice(1);
  };

  return (
    <div className="info-content">
      <div className="info-box">
        {/* 사용자 정보 폼 */}
        <form className={formClassName} onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className="info-form-group" key={field}>
              <div className="form-label">{formatLabel(field)}</div>
              <div className="form-input">
                <input
                  type="text"
                  id={field}
                  value={userInfo[field] || ''}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          ))}
        </form>
      </div>
      <div className="button-content">
        {buttonConfig.showSearch && <button type="button" className="btn-search">Search</button>}
        {buttonConfig.showSave && <button type="submit" className="btn-save" onClick={handleSubmit}>Save</button>}
        {buttonConfig.showDelete && <button type="button" className="btn-delete">Delete</button>}
      </div>
    </div>
  );
};

export default Info;