import React, { useState, useEffect } from 'react';
import './ProAnaSimulCode.css';

const ProcessCodeForm = () => {
  const [processInfo, setProcessInfo] = useState({
    processId: '',
    processName: '',
    AppClass1: '',
    AppClass2: '',
    AppClass3: '',
    EquipId: ''
  });
  
  const [process, setProcess] = useState([]);

  useEffect(() => {
    fetch('./ProcessInformation.json')
      .then((response) => response.json())
      .then((data) => {
        setProcess(data.process);
      })
      .catch((error) => console.error('Error loading process data:', error));
  }, []);

  const handleChange = (e) => {
    setProcessInfo({
      ...processInfo,
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
            {['process Id', 'process Name', 'process App Class 1', 'process App Class 2', 'process App Class 3', 'equipment Id'].map((field) => (
              <div className="info-form-group" key={field}>
                <div className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</div>
                <div className="form-input">
                  <input
                    type="text"
                    name={field}
                    value={processInfo[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            ))}
            
            {/* Dropdown for Material Type */}
            {/* <div className="info-form-group">
              <div className="form-label">Default Process?</div>
              <div className="form-input">
                <select name="materialType" value={processInfo.materialType} onChange={handleChange} required>
                  <option value="">Y/N</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div> */}

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
                  <th>Process Id</th>
                  <th>Process Name</th>
                  <th>App Class 1</th>
                  <th>App Class 2</th>
                  <th>App Class 3</th>
                  <th>Equipment Id</th>
                </tr>
              </thead>
              <tbody>
                {process.map((process) => (
                  <tr key={process.processId}>
                    <td>{process.processName}</td>
                    <td>{process.AppClass1}</td>
                    <td>{process.AppClass2}</td>
                    <td>{process.AppClass3}</td>
                    <td>{process.EquipId}</td>
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

export default ProcessCodeForm;
