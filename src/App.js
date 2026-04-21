import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import HomeDashBoard from './Pages/Home/HomeDashBoard';
import UserInformation from './Pages/UserInformation';
import Login from './Pages/Login';
import Loggedin from './Pages/Loggedin';
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

// --- Helper Components & Data ---

const DataManagement = () => (
    <div style={{ padding: '50px', textAlign: 'center', fontSize: '24px' }}>
      구현 예정입니다.
    </div>
);

// 1. 네비게이션 메뉴 구조를 데이터로 분리
const navItems = [
  {
    name: 'Code v',
    path: '/Code',
    dropdown: [
      { name: 'Material Code/Alias/Group', path: '/Code/MaterialCodeAliasGroup' },
      { name: 'Process/Analysis/Simulation Code', path: '/Code/ProcessAnalysisSimulationCode' },
      { name: 'Equipment Code', path: '/Code/EquipmentCode' },
      { name: 'Provider Code', path: '/Code/ProviderCode' },
      { name: 'Material Inventory', path: '/Code/MaterialInventory' },
    ],
  },
  {
    name: 'Search v',
    path: '/Search',
    dropdown: [
      { name: 'Property', path: '/Search/Property' },
      { name: 'Analysis', path: '/Search/Analysis' },
      { name: 'Literature', path: '/Search/Literature' },
      { name: 'Simulation', path: '/Search/ProcessSimulation' },
    ],
  },
  { name: 'Work Order', path: '/Work Order' },
  { name: 'Recipe', path: '/Recipe' },
  { name: 'User Information', path: '/User Information' },
  { name: 'Data Management', path: '/Data Management' },
];


// --- Layout Component ---

const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();

  const getSubHeaderText = () => {
    switch (location.pathname) {
      case '/': case '/PCEC HUB': return 'Data Dashboard';
      case '/User%20Information': return 'User Information';
      case '/Login': return 'Login';
      case '/Recipe': return 'Recipe';
      case '/Code': return 'Code';
      case '/Code/EquipmentCode': return 'Equipment Code';
      case '/Code/MaterialCodeAliasGroup': return 'Material Code / Alias / Group';
      case '/Code/ProcessAnalysisSimulationCode': return 'Process / Analysis / Simulation Code';
      case '/Search': return 'Search';
      case '/Work%20Order': return 'Work Order';
      case '/Code/MaterialInventory': return 'Material Inventory';
      case '/Code/ProviderCode': return 'Provider Code';
      case '/Search/Property': return 'Property';
      case '/Search/Analysis': return 'Analysis';
      case '/Search/Literature': return 'Literature';
      case '/Search/ProcessSimulation': return 'Simulation';
      default: return 'Hello';
    }
  };

  return (
      <div className="layout">
        <header className="navbar follow-scroll">
          <div className="nav-left">
            <Link to="/" className="nav-button">
              <img
                  src={require('./h2.png')}
                  alt="h2 Logo"
                  style={{ height: '30px', width: '180px', display: 'block' }}
              />
            </Link>
          </div>
          <div className="nav-right">
            {navItems.map((item) => (
                <div key={item.name} className={`nav-item ${item.dropdown ? 'code-dropdown' : ''}`}>
                  <Link to={item.path} className="nav-button">{item.name}</Link>
                  {item.dropdown && (
                      <div className="dropdown-menu">
                        {item.dropdown.map((subItem) => (
                            <Link key={subItem.name} to={subItem.path} className="dropdown-item">{subItem.name}</Link>
                        ))}
                      </div>
                  )}
                </div>
            ))}
            <div className="nav-item">
              {isLoggedIn ? (
                  <button
                      className="nav-button"
                      onClick={() => { setIsLoggedIn(false); alert('로그아웃 되었습니다.'); }}
                      style={{ background: 'none', color: '#ecf0f1', border: 'none', fontFamily: 'Arial, sans-serif' }}
                  >
                    Logout
                  </button>
              ) : (
                  <Link to="/Login" className="nav-button">Login</Link>
              )}
            </div>
          </div>
        </header>

        {/* 2. 서브 헤더 보이도록 수정 */}
        <main style={{ paddingTop: '60px' }}>
          <div className="Sub-header">{getSubHeaderText()}</div>
          <Outlet />
        </main>

      </div>
  );
};


// --- Main App Component ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
            <Route index element={isLoggedIn ? <Loggedin setIsLoggedIn={setIsLoggedIn} /> : <HomeDashBoard />} />
            <Route path="User Information" element={<UserInformation />} />
            <Route path="Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="Recipe" element={<Recipe />} />
            <Route path="Search" element={<Search />} />
            <Route path="Code" element={<Code />} />
            <Route path="Work Order" element={<WorkOrder />} />
            <Route path="Code/EquipmentCode" element={<EquipmentCode />} />
            <Route path="Code/MaterialCodeAliasGroup" element={<MaterialCodeAliasGroup />} />
            <Route path="Code/MaterialInventory" element={<MaterialInventory />} />
            <Route path="Code/MaterialAlias" element={<MaterialAliasForm />} />
            <Route path="Code/MaterialCode" element={<MaterialCodeForm />} />
            <Route path="Code/ProviderCode" element={<ProviderCode />} />

            {/* 3. 중첩 라우팅으로 문제 해결 */}
            <Route path="Code/ProcessAnalysisSimulationCode" element={<ProcessAnalysisSimulationCode />}>
              <Route path="process" element={<ProcessCodeForm />} />
              <Route path="simulation" element={<SimulationCodeForm />} />
              <Route path="analysis" element={<AnalysisCodeForm />} />
            </Route>

            <Route path="Search/Analysis" element={<Analysis />} />
            <Route path="Search/Literature" element={<Literature />} />
            <Route path="Search/ProcessSimulation" element={<ProcessSimulation />} />
            <Route path="Search/Property" element={<Property />} />
            <Route path="Data Management" element={<DataManagement />} />
          </Route>
        </Routes>
      </Router>
  );
}