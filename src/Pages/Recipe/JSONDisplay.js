// JSONDisplay.js
import React, { useEffect, useState } from 'react';


const JSONDisplay = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const response = await fetch('InitialNodes.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJsonData(JSON.stringify(data, null, 2)); // 잘 읽은 데이터를 보기 좋게 포맷
      } catch (error) {
        console.error('Failed to load JSON data:', error);
      }
    };

    fetchJsonData();
  }, []);

  return (
    <div className="json-display-container">
      <h3>JSON Data</h3>
      <pre className="json-display-text">{jsonData || 'Loading...'}</pre>
    </div>
  );
};

export default JSONDisplay;
