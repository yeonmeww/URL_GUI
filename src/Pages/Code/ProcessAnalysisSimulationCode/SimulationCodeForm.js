import React, { useState, useEffect } from 'react';
import './ProAnaSimulCode.css';

const SimulationCodeForm = () => {
  const [simulationInfo, setSimulationInfo] = useState({
    materialName: '',
    materialGroup: '',
    chemicalFormula: '',
    applicationClass1: '',
    materialType: '',
    applicationClass2: '', 
    materialForm: '',
    applicationClass3: ''
  });
  
  const [simulation, setSimulation] = useState([]);

  useEffect(() => {
    fetch('./SimulationInformation.json')
      .then((response) => response.json())
      .then((data) => {
        setSimulation(data.simulation);
      })
      .catch((error) => console.error('Error loading simulation data:', error));
  }, []);

  const handleChange = (e) => {
    setSimulationInfo({
      ...simulationInfo,
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
            {['simulation Id','simulation Name', 'simulation Purpose','simulation Type', 'simulation App Class 1',  'simulation App Class 2', 'simulation App Class 3'].map((field) => (
              <div className="info-form-group" key={field}>
                <div className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</div>
                <div className="form-input">
                  <input
                    type="text"
                    name={field}
                    value={simulationInfo[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            ))}
            
            {/* Dropdown for Material Type */}
            {/* <div className="info-form-group">
              <div className="form-label">Material Type</div>
              <div className="form-input">
                <select name="materialType" value={simulationInfo.materialType} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  <option value="Raw">Raw</option>
                  <option value="Product">Product</option>
                </select>
              </div>
            </div> */}

            {/* Dropdown for Material Form */}
            {/* <div className="info-form-group">
              <div className="form-label">Material Form</div>
              <div className="form-input">
                <select name="materialForm" value={simulationInfo.materialForm} onChange={handleChange} required>
                  <option value="">Select Form</option>
                  <option value="Powder">Powder</option>
                  <option value="Liquid">Liquid</option>
                  <option value="Slurry">Slurry</option>
                  <option value="Pellet">Pellet</option>
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
                  <th>Simulation Id</th>
                  <th>Simulation Name</th>
                  <th>Simulation Purpose</th>
                  <th>Simulation Type</th>
                  <th>Simulation App Class 1</th>
                  <th>Simulation App Class 1</th>
                  <th>Simulation App Class 1</th>
                </tr>
              </thead>
              <tbody>
                {simulation.map((simulation) => (
                  <tr key={simulation.simulationId}>
                    <td>{simulation.simulationName}</td>
                    <td>{simulation.chemicalPurpose}</td>
                    <td>{simulation.simulationType}</td>
                    <td>{simulation.simulationAppClass1}</td>
                    <td>{simulation.simulationAppClass2}</td>
                    <td>{simulation.simulationAppClass3}</td>
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

export default SimulationCodeForm;
