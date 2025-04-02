import React, { useState, useEffect } from 'react';
import './MaterialCode.css';

const MaterialCodeForm = () => {
  const [codeInfo, setCodeInfo] = useState({
    materialName: '',
    materialGroup: '',
    chemicalFormula: '',
    applicationClass1: '',
    materialType: '',
    applicationClass2: '', 
    materialForm: '',
    applicationClass3: ''
  });
  
  const [code, setCode] = useState([]);

  useEffect(() => {
    fetch('./CodeInformation.json')
      .then((response) => response.json())
      .then((data) => {
        setCode(data.code);
      })
      .catch((error) => console.error('Error loading code data:', error));
  }, []);

  const handleChange = (e) => {
    setCodeInfo({
      ...codeInfo,
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
            {['material Name', 'material Group', 'chemical Formula', 'application Class1', 'application Class2', 'application Class3'].map((field) => (
              <div className="info-form-group" key={field}>
                <div className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</div>
                <div className="form-input">
                  <input
                    type="text"
                    name={field}
                    value={codeInfo[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            ))}
            
            {/* Dropdown for Material Type */}
            <div className="info-form-group">
              <div className="form-label">Material Type</div>
              <div className="form-input">
                <select name="materialType" value={codeInfo.materialType} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  <option value="Raw">Raw</option>
                  <option value="Product">Product</option>
                </select>
              </div>
            </div>

            {/* Dropdown for Material Form */}
            <div className="info-form-group">
              <div className="form-label">Material Form</div>
              <div className="form-input">
                <select name="materialForm" value={codeInfo.materialForm} onChange={handleChange} required>
                  <option value="">Select Form</option>
                  <option value="Powder">Powder</option>
                  <option value="Liquid">Liquid</option>
                  <option value="Slurry">Slurry</option>
                  <option value="Pellet">Pellet</option>
                </select>
              </div>
            </div>
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
                  <th>Material Id</th>
                  <th>Chemical Name</th>
                  <th>Material Chemical Formula</th>
                  <th>Material Group Id</th>
                  <th>Material Type</th>
                  <th>Material Form</th>
                  <th>Application Class 1</th>
                  <th>Application Class 2</th>
                  <th>Application Class 3</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {code.map((code) => (
                  <tr key={code.materialName}>
                    <td>{code.materialName}</td>
                    <td>{code.chemicalFormula}</td>
                    <td>{code.materialType}</td>
                    <td>{code.materialGroup}</td>
                    <td>{code.applicationClass1}</td>
                    <td>{code.role}</td>
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

export default MaterialCodeForm;
