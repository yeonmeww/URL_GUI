// index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // React 19에서 'react-dom/client' 사용
import './index.css';
import App from './App';

// React 18 이상에서 'createRoot' 사용
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
