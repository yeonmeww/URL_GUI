
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import HomeDashBoard from './Pages/Home/HomeDashBoard';
import UserInformation from './Pages/UserInformation';
import Login from './Pages/Login';
import Recipe from './Pages/Recipe/Recipe';
import Code from './Pages/Code/Code';
import Search from './Pages/Search/Search';
import WorkOrder from './Pages/WorkOrder';
import EquipmentCode from './Pages/Code/EquipmentCode'
import MaterialCodeAliasGroup from './Pages/Code/MaterialCode/MaterialCodeAliasGroup'
import MaterialInventory from './Pages/Code/MaterialInventory'
import AnalysisCodeForm from './Pages/Code/ProcessAnalysisSimulationCode/AnalysisCodeForm';
import SimulationCodeForm from './Pages/Code/ProcessAnalysisSimulationCode/ProcessAliasForm';
import ProcessCodeForm from './Pages/Code/ProcessAnalysisSimulationCode/ProcessCodeForm';
import MaterialAliasForm from './Pages/Code/MaterialCode/MaterialAliasForm';
import ProcessAnalysisSimulationCode from './Pages/Code/ProcessAnalysisSimulationCode/ProcessAnalysisSimulationCode';
import MaterialCodeForm from './Pages/Code/MaterialCode/MaterialCodeForm';
import ProviderCode from './Pages/Code/ProviderCode';
import Analysis from './Pages/Search/Analysis'
import Literature from './Pages/Search/Literature'
import ProcessSimulation from './Pages/Search/ProcessSimulation'
import Property from './Pages/Search/Property'


import './App.css';
import './Pages/Home/HomeDashBoard.css'

const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation(); // 현재 경로 정보 가져오기

  // 각 경로에 맞는 텍스트 설정
  const getSubHeaderText = () => {
    switch (location.pathname) {
      case '/':
      case '/PCEC HUB':
        return 'Data Dashboard';
      case '/User%20Information':
        return 'User Information';
      case '/Login':
        return 'Login';
      case '/Recipe':
        return 'Recipe';
      case '/Code':
        return 'Code';
      case '/Code/EquipmentCode':
        return 'Equipment Code';
      case '/Code/MaterialCodeAliasGroup':
        return 'Material Code / Alias / Group';
      case '/Code/ProcessAnalysisSimulationCode':
        return 'Process / Analysis / Simulation Code';
      case '/Search':
        return 'Search';
      case '/Work%20Order':
        return 'Work Order';
      case '/Code/MaterialInventory':
        return 'Material Inventory';
      case '/Code/ProviderCode':
        return 'Provider Code';
      case '/Search/Property':
        return 'Property';
      case '/Search/Analysis':
        return 'Analysis';
      case '/Search/Literature':
        return 'Literature';
      case '/Search/ProcessSimulation':
        return 'ProcessSimulation';
      default:
        return 'Hello'; // 기본 텍스트
    }
  };

  // Handle mouse enter and leave to show/hide dropdown


  return (
      <div className="layout">
        <header className="navbar follow-scroll">
        <div className="nav-left">
            <Link to="/" className="nav-button">PCEC HUB</Link>
          </div>
          <div className="nav-right">
            <div className="nav-item code-dropdown">
              <Link to="/Code" className="nav-button">Code v</Link>
              <div className="dropdown-menu">
                <Link to="/Code/MaterialCodeAliasGroup" className="dropdown-item">Material Code/Alias/Group</Link>
                <Link to="/Code/ProcessAnalysisSimulationCode" className="dropdown-item">Process/Analysis/Simulation Code</Link>
                <Link to="/Code/EquipmentCode" className="dropdown-item">Equipment Code</Link>
                <Link to="/Code/ProviderCode" className="dropdown-item">Provider Code</Link>
                <Link to="/Code/MaterialInventory" className="dropdown-item">Material Inventory</Link>
              </div>
            </div>

    {/* Search 메뉴에만 드롭다운 추가 */}
    <div className="nav-item search-dropdown">
      <Link to="/Search" className="nav-button">
        Search v
      </Link>
      <div className="dropdown-menu">
        <Link to="/Search/Property" className="dropdown-item">Property</Link>
        <Link to="/Search/Analysis" className="dropdown-item">Analysis</Link>
        <Link to="/Search/Literature" className="dropdown-item">Literature</Link>
        <Link to="/Search/ProcessSimulation" className="dropdown-item">Process Simulation</Link>
      </div>
    </div>
    {['Work Order', 'Recipe', 'User Information'].map((page) => (
      <div className="nav-item" key={page}>
        <Link to={`/${page}`} className="nav-button">
          {page}
        </Link>
      </div>
    ))}
    <div className="nav-item">
      {
        isLoggedIn ? (
        <button
        className="nav-button"
        onClick={() => {
        setIsLoggedIn(false);
        alert('로그아웃 되었습니다.');
      }}
        style={{
          background: 'none',
          color: '#ecf0f1',
          border: 'none',
          fontSize: '18px',
          fontWeight: 'bold',
          padding: '10px',
          borderRadius: '4px',
          cursor: 'pointer',
          textDecoration: 'none',
          fontFamily: 'Arial, sans-serif', // 나머지 메뉴와 일치하도록 지정
          display: 'inline-block',
          lineHeight: 'normal'
        }}
    >
      Logout
    </button>
    ) : (
    <Link to="/Login" className="nav-button">Login</Link>
    )
    }
  </div>
  </div>
</header>

      {/* <subHeader>{getSubHeaderText()}</subHeader>  */}
      <Outlet /> {/* This is where the routed components will be rendered */}
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
          <Route index element={<HomeDashBoard />} />
          <Route path="PCECHUB" element={<HomeDashBoard />} />
          <Route path="User Information" element={<UserInformation />} />
          <Route path="Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="Recipe" element={<Recipe />} />
          <Route path="Search" element={<Search />} />
          <Route path="Code" element={<Code />} />
          <Route path="Work Order" element={<WorkOrder />} />
          <Route path="Code/EquipmentCode" element={<EquipmentCode />} />
          <Route path="Code/MaterialCodeAliasGroup" element={<MaterialCodeAliasGroup />} />
          <Route path="Code/MaterialInventory" element={<MaterialInventory />} />
          <Route path="Code/ProcessAnalysisSimulationCode" element={<ProcessAnalysisSimulationCode />} />
          <Route path="Code/ProcessAnalysisSimulationCode" element={<ProcessCodeForm />} />
          <Route path="Code/ProcessAnalysisSimulationCode" element={<SimulationCodeForm />} />
          <Route path="Code/ProcessAnalysisSimulationCode" element={<AnalysisCodeForm />} />
          <Route path="Code/MaterialAlias" element={<MaterialAliasForm />} />
          <Route path="Code/MaterialCode" element={<MaterialCodeForm />} />
          <Route path="Code/ProviderCode" element={<ProviderCode />} />
          <Route path="Search/Analysis" element={<Analysis />} />
          <Route path="Search/Literature" element={<Literature />} />
          <Route path="Search/ProcessSimulation" element={<ProcessSimulation />} />
          <Route path="Search/Property" element={<Property />} />
        </Route>
      </Routes>
    </Router>
  );
}



