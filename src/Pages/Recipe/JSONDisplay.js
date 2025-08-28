import React, { useEffect, useState } from 'react';

const JSONDisplay = () => {
  const [jsonData, setJsonData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const response = await fetch('InitialRecipeData.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJsonData(data);

        if (Array.isArray(data) && data.length > 0) {
          setHeaders(Object.keys(data[0])); // 첫 번째 항목 기준으로 헤더 추출
        }
      } catch (error) {
        console.error('Failed to load JSON data:', error);
      }
    };

    fetchJsonData();
  }, []);

  return (
    <div className="json-display-container" style={{ padding: '20px', overflowX: 'auto' }}>
      <div className="general-display-container" style={{ padding: '20px', overflowX: 'auto' }}>
        <h3>General Data Table</h3>
        {jsonData.length > 0 ? (
          <table style={{ 
            borderCollapse: 'collapse', 
            width: '100%', 
            fontSize: '12px',         // 글씨 크기 조정
            textAlign: 'center'        // 글씨 가운데 정렬
          }}>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th 
                    key={header} 
                    style={{ 
                      border: '1px solid #ccc', 
                      padding: '8px', 
                      backgroundColor: '#f5f5f5',
                      textAlign: 'center'       // 헤더도 가운데 정렬
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jsonData.map((row, index) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td 
                      key={header} 
                      style={{ 
                        border: '1px solid #ccc', 
                        padding: '8px',
                        textAlign: 'center'      // 본문도 가운데 정렬
                      }}
                    >
                      {row[header] ?? ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
        
      </div>

      <div className="block-display-container" style={{ padding: '20px', overflowX: 'auto' }}>
        <h3>Block Data Table</h3>
        {jsonData.length > 0 ? (
          <table style={{ 
            borderCollapse: 'collapse', 
            width: '100%', 
            fontSize: '12px',         // 글씨 크기 조정
            textAlign: 'center'        // 글씨 가운데 정렬
          }}>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th 
                    key={header} 
                    style={{ 
                      border: '1px solid #ccc', 
                      padding: '8px', 
                      backgroundColor: '#f5f5f5',
                      textAlign: 'center'       // 헤더도 가운데 정렬
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jsonData.map((row, index) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td 
                      key={header} 
                      style={{ 
                        border: '1px solid #ccc', 
                        padding: '8px',
                        textAlign: 'center'      // 본문도 가운데 정렬
                      }}
                    >
                      {row[header] ?? ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
        
      </div>
    </div>
  );
};

export default JSONDisplay;
