import React, { useRef } from 'react';
import './SearchBox.css';

const SearchBox = ({
  SearchBoxData = {},
  setSearchBoxData = () => {},
  onSubmit = () => {},
  fields = [],
  formClassName = "SearchBox-form",
  buttonConfig = {
    showSearch: true,
    showSave: true,
    showDelete: true
  }
}) => {
  const formRef = useRef(null); // form을 참조할 ref 생성

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
        if (element.tagName === 'SELECT') {
          // SELECT 박스일 경우
          newData[field] = element.options[element.selectedIndex]?.value || '';
        } else {
          // INPUT 박스일 경우
          newData[field] = element.value || '';
        }
      }
    });

    setSearchBoxData(newData); // 여기서 최종적으로 저장
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
              <label htmlFor={field} className="form-label">
                {formatLabel(field)}
              </label>
              <div className="form-input">
                {toggleFields.includes(field) ? (
                  <select id={field} defaultValue={SearchBoxData[field] || ''}>
                    <option value="" disabled>Select</option> {/* 'Select'는 기본적으로 표시 */}
                    {(toggleOptions[field] || []).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    id={field}
                    defaultValue={SearchBoxData[field] || ''}
                    required
                  />
                )}
              </div>
            </div>
          ))}
        </form>
      </div>

      <div className="button-content">
        {buttonConfig.showSearch && (
          <button
            type="button"
            className="btn-search"
            onClick={handleSearchClick}
          >
            Search
          </button>
        )}
        {buttonConfig.showSave && (
          <button type="submit" className="btn-save" onClick={handleSubmit}>
            Save
          </button>
        )}
        {buttonConfig.showDelete && (
          <button type="button" className="btn-delete">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
