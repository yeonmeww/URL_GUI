import React, { useState, useEffect } from 'react';
import './MaterialCode.css';

const MaterialAliasForm = () => {
  const [aliasInfo, setAliasInfo] = useState({
    groupName: '',
    chemicalFormula: '',
  });
  
  const [alias, setAlias] = useState([]);

  useEffect(() => {
    fetch('./AliasInformation.json')
      .then((response) => response.json())
      .then((data) => {
        setAlias(data.alias);
      })
      .catch((error) => console.error('Error loading alias data:', error));
  }, []);

  const handleChange = (e) => {
    setAliasInfo({
      ...aliasInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('정보가 저장되었습니다!');
  };

  return (
    <div className="material-info">
      <div className="info-content">
        <div className="info-box">
          <form className="material-form" onSubmit={handleSubmit}>
            {['group name', 'chemical formula'].map((field) => (
              <div className="info-form-group" key={field}>
                <div className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</div>
                <div className="form-input">
                  <input
                    type="text"
                    name={field}
                    value={aliasInfo[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            ))}
            

          </form>
        </div>
        
        <div className="button-content">
          <button type="button" className="btn-search">Search</button>
          <button type="submit" className="btn-save">Save</button>
          <button type="button" className="btn-delete">Delete</button>
        </div>
      </div>
      
      <div className="data-content">
        <section className="material-table">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Material Group Id</th>
                  <th>Material Group Name</th>
                </tr>
              </thead>
              <tbody>
                {alias.map((alias) => (
                  <tr key={alias.materialGroupId}>
                    <td>{alias.materialGroupName}</td>
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

export default MaterialAliasForm;
