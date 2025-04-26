import React from 'react';
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
  const handleChange = (e) => {
    if (!e?.target) return;
    const { id, value } = e.target;
    setSearchBoxData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const formatLabel = (field) => {
    if (!field) return '';
    let noUnderscore = field.replace(/_/g, '');
    let spacedText = noUnderscore.replace(/([a-z])([A-Z])/g, '$1 $2');
    return spacedText.charAt(0).toUpperCase() + spacedText.slice(1);
  };

  // 토글로 표시할 필드 목록
  const toggleFields = ['materialType', 'materialForm', 'role', 'isDefault'];

  // 토글 옵션 값도 여기 설정 (필요에 따라 수정 가능)
  const toggleOptions = {
    materialType: ['Raw', 'Product'],
    materialForm: ['Powder', 'Liquid', 'Slurry', 'Pellet'],
    role: ['Base', 'Additive', 'Catalyst'],
    isDefault: ['Yes', 'No']
  };

  return (
    <div className="SearchBox-content">
      <div className="SearchBox-box">
        <form className={formClassName} onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className="info-form-group" key={field}>
              <label htmlFor={field} className="form-label">
                {formatLabel(field)}
              </label>
              <div className="form-input">
                {toggleFields.includes(field) ? (
                  // 🔥 토글(dropdown)로 렌더링
                  <select
                    id={field}
                    value={SearchBoxData[field] || ''}
                    onChange={handleChange}
                  >
                    <option value="">Select {formatLabel(field)}</option>
                    {(toggleOptions[field] || []).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  // 🔥 기본 텍스트 인풋
                  <input
                    type="text"
                    id={field}
                    value={SearchBoxData[field] || ''}
                    onChange={handleChange}
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
          <button type="button" className="btn-search">Search</button>
        )}
        {buttonConfig.showSave && (
          <button type="submit" className="btn-save" onClick={handleSubmit}>Save</button>
        )}
        {buttonConfig.showDelete && (
          <button type="button" className="btn-delete">Delete</button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
