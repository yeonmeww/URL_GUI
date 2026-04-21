import React, { useState, useEffect } from "react";
import "./ProAnaSimulCode.css"; // 스타일 파일 불러오기
import ProcessCodeForm from "./ProcessCodeForm";
import AnalysisCodeForm from "./AnalysisCodeForm";
import SimulationCodeForm from "./SimulationCodeForm";

const ProcessAnalysisSimulationCode = () => {
  return (
    <div className="material-code-container">
      <ProAnaSimulTab />
    </div>
  );
};

const ProAnaSimulTab = () => {
  const [activeTab, setActiveTab] = useState("process");

  return (
    <>
      <ul className="tab-menu">
        <li className="tab-item">
          <button className={`tab-link ${activeTab === "process" ? "active" : ""}`} onClick={() => setActiveTab("process")}>
            Process Code
          </button>
        </li>
        <li className="tab-item">
          <button className={`tab-link ${activeTab === "analysis" ? "active" : ""}`} onClick={() => setActiveTab("analysis")}>
            Analysis Code
          </button>
        </li>
        <li className="tab-item">
          <button className={`tab-link ${activeTab === "simulation" ? "active" : ""}`} onClick={() => setActiveTab("simulation")}>
            Simulation Code
          </button>
        </li>
      </ul>

      <div className="tab-content-container">
        {activeTab === "process" && <ProcessCodeForm />}
        {activeTab === "analysis" && <AnalysisCodeForm />}
        {activeTab === "simulation" && <SimulationCodeForm />}
      </div>
    </>
  );
};

export default ProcessAnalysisSimulationCode;
