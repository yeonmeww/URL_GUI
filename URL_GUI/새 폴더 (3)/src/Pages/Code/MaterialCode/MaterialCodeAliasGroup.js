import React, { useState, useEffect } from "react";
import "./MaterialCode.css"; // 스타일 파일 불러오기
import MaterialCodeForm from "./MaterialCodeForm";
import MaterialAliasForm from "./MaterialAliasForm";
import MaterialGroupForm from "./MaterialGroupForm";

const MaterialCodeAliasGroup = () => {
  return (
    <div className="material-code-container">
      {/* <h1>Material Code/Alias/Group</h1> */}
      <MaterialTabs />
    </div>
  );
};

const MaterialTabs = () => {
  const [activeTab, setActiveTab] = useState("code");

  return (
    <>
      <ul className="tab-menu">
        <li className="tab-item">
          <button className={`tab-link ${activeTab === "code" ? "active" : ""}`} onClick={() => setActiveTab("code")}>
            Material Code
          </button>
        </li>
        <li className="tab-item">
          <button className={`tab-link ${activeTab === "alias" ? "active" : ""}`} onClick={() => setActiveTab("alias")}>
            Material Alias
          </button>
        </li>
        <li className="tab-item">
          <button className={`tab-link ${activeTab === "group" ? "active" : ""}`} onClick={() => setActiveTab("group")}>
            Material Group
          </button>
        </li>
      </ul>

      <div className="tab-content-container">
        {activeTab === "code" && <MaterialCodeForm />}
        {activeTab === "alias" && <MaterialAliasForm />}
        {activeTab === "group" && <MaterialGroupForm />}
      </div>
    </>
  );
};

export default MaterialCodeAliasGroup;
