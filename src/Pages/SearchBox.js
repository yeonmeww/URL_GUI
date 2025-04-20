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
  const formatLabel = (field) =>
    field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
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
                <input
                  type="text"
                  id={field}
                  value={SearchBoxData[field] || ''}
                  onChange={handleChange}
                  required
                />
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