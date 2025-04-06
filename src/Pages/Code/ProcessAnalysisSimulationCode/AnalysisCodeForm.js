import React, { useState, useEffect } from 'react';
import './ProAnaSimulCode.css';

const AnalysisCodeForm = () => {
  const [analysisInfo, setAnalysisInfo] = useState({
    analysisId: '',
    analysisName: '',
    analysisPurpose: '',
    AppClass1: '',
    AppClass2: '',
    AppClass3: '',
    EquipId: '',
  });
  
  const [analysis, setAnalysis] = useState([]);

  useEffect(() => {
    fetch('./AnalysisInformation.json')
      .then((response) => response.json())
      .then((data) => {
        setAnalysis(data.analysis);
      })
      .catch((error) => console.error('Error loading analysis data:', error));
  }, []);

  const handleChange = (e) => {
    setAnalysisInfo({
      ...analysisInfo,
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
            {['analysis Id','analysis Name', 'analysis Purpose','analysis App Class 1',  'analysis App Class 2', 'analysis App Class 3', 'equipment Id'].map((field) => (
              <div className="info-form-group" key={field}>
                <div className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</div>
                <div className="form-input">
                  <input
                    type="text"
                    name={field}
                    value={analysisInfo[field]}
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
                  <th>Analysis Id</th>
                  <th>Analysis Name</th>
                  <th>Analysis Purpose</th>
                  <th>App Class 1</th>
                  <th>App Class 2</th>
                  <th>App Class 3</th>
                  <th>Equipment Id</th>
                </tr>
              </thead>
              <tbody>
                {analysis.map((analysis) => (
                  <tr key={analysis.analysisId}>
                    <td>{analysis.analysisName}</td>
                    <td>{analysis.analysisPurpose}</td>
                    <td>{analysis.AppClass1}</td>
                    <td>{analysis.AppClass2}</td>
                    <td>{analysis.AppClass3}</td>
                    <td>{analysis.EquipId}</td>
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

export default AnalysisCodeForm;
