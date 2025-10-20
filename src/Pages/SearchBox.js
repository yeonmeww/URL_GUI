import React, { useRef } from 'react';
import './SearchBox.css';

// 1. 기본 버튼 설정을 컴포넌트 외부의 상수로 정의합니다.
// 이것이 이 컴포넌트의 '기본 상태'입니다.
const defaultButtonConfig = {
  showSearch: true,
  showSave: true,
  showDelete: true,
  showDownload: false // 다운로드 버튼은 기본적으로 보이지 않습니다.
};

const SearchBox = ({
                     SearchBoxData = {},
                     setSearchBoxData = () => {},
                     onSubmit = () => {},
                     fields = [],
                     formClassName = "SearchBox-form",
                     // 2. 부모로부터 buttonConfig prop을 받습니다. 전달되지 않으면 빈 객체({})입니다.
                     buttonConfig = {}
                   }) => {
  const formRef = useRef(null);

  // 3. ✨ 핵심 ✨: 기본 설정과 부모에게서 받은 설정을 '합칩니다'.
  // 이렇게 하면 부모가 showDownload:true만 보내도 기존 버튼들이 사라지지 않습니다.
  const finalButtonConfig = {
    ...defaultButtonConfig, // 기본값을 먼저 전체 복사하고,
    ...buttonConfig        // 부모가 보낸 값으로 덮어씁니다.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleSearchClick = () => {
    if (!formRef.current) return;
    const newData = {};
    fields.forEach((field) => {
      const element = formRef.current.querySelector(`#${field}`);
      if (element) {
        newData[field] = element.tagName === 'SELECT'
            ? element.options[element.selectedIndex]?.value || ''
            : element.value || '';
      }
    });
    setSearchBoxData(newData);
    console.log('🔍 Search 버튼 클릭!');
    console.log('현재 입력값:', newData);
  };

  const formatLabel = (field) => {
    if (!field) return '';
    let noUnderscore = field.replace(/_/g, '');
    let spacedText = noUnderscore.replace(/([a-z])([A-Z])/g, '$1 $2');
    return spacedText.charAt(0).toUpperCase() + spacedText.slice(1);
  };

  const toggleFields = ['materialType', 'materialForm', 'role', 'isDefault'];
  const toggleOptions = {
    materialType: ['Raw', 'Product'],
    materialForm: ['Powder', 'Liquid', 'Slurry', 'Pellet'],
    role: ['Base', 'Additive', 'Catalyst'],
    isDefault: ['Yes', 'No']
  };

  return (
      <div className="SearchBox-content">
        <div className="SearchBox-box">
          <form ref={formRef} className={formClassName} onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div className="info-form-group" key={field}>
                  <label htmlFor={field} className="form-label">{formatLabel(field)}</label>
                  <div className="form-input">
                    {toggleFields.includes(field) ? (
                        <select id={field} defaultValue={SearchBoxData[field] || ''}>
                          <option value="" disabled>Select</option>
                          {(toggleOptions[field] || []).map((option) => (
                              <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                    ) : (
                        <input type="text" id={field} defaultValue={SearchBoxData[field] || ''} required />
                    )}
                  </div>
                </div>
            ))}
          </form>
        </div>

        <div className="button-content">
          {/* 4. 최종적으로 합쳐진 finalButtonConfig를 사용해 버튼을 보여줍니다. */}
          {finalButtonConfig.showSearch && <button type="button" className="btn-search" onClick={handleSearchClick}>Search</button>}
          {finalButtonConfig.showSave && <button type="submit" className="btn-save" onClick={handleSubmit}>Save</button>}
          {finalButtonConfig.showDelete && <button type="button" className="btn-delete">Delete</button>}
          {finalButtonConfig.showDownload && <button type="button" className="btn-download">Download</button>}
        </div>
      </div>
  );
};

export default SearchBox;