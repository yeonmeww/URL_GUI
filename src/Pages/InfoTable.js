import React, { useState, useEffect, useRef } from 'react';
import './InfoTable.css';

// 텍스트 포맷팅 함수
const formatHeaderText = (text) => {
  if (!text) return '';

  // 1. 언더바를 띄어쓰기로 변경
  let withSpaces = text.replace(/_/g, ' ');

  // 2. 첫 글자 대문자로 변환
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};

const InfoTable = ({
  headers = [],
  data = [],
  containerClassName = "table-container",
  tableClassName = "table"
}) => {
  const [containerHeight, setContainerHeight] = useState(window.innerHeight * 0.47); // 70% of viewport height
  const containerRef = useRef(null);

  // Update the height dynamically if the window size changes
  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(window.innerHeight * 0.6); // Adjust to 70% of viewport height
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={containerClassName} 
      style={{ height: containerHeight }}
    >
      <table className={tableClassName}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={header.length > 10 ? 'small-text' : ''}>
                {formatHeaderText(header)}
              </th> 
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => {
                const cellContent = row[header] || '';
                return (
                  <td key={colIndex} className="table-cell">
                    <div className="cell-content">
                      {typeof cellContent === 'string' && cellContent.includes('\n')
                        ? cellContent.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i < cellContent.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          ))
                        : cellContent
                      }
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoTable;
