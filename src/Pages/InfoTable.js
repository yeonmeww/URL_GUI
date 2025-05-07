import React, { useState, useEffect, useRef } from 'react';
import './InfoTable.css';

// 텍스트 포맷팅 함수
const formatHeaderText = (text) => {
  if (!text) return '';
  // 1. 언더바 제거
  let noUnderscore = text.replace(/_/g, '');
  // 2. 대문자 앞에 띄어쓰기 삽입 (맨 첫 글자는 제외)
  let spacedText = noUnderscore.replace(/([A-Z])/g, ' $1').trim();
  // 3. 첫 글자 대문자로 변환
  return spacedText.charAt(0).toUpperCase() + spacedText.slice(1);
};

const InfoTable = ({
  headers = [],
  data = [],
  containerClassName = "table-container",
  tableClassName = "table"
}) => {
  const [containerHeight, setContainerHeight] = useState(window.innerHeight * 0.47);
  const containerRef = useRef(null);


  useEffect(() => {
    const handleResize = () => {
    setContainerHeight(window.innerHeight * 0.6);
  };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    // 컬럼 너비를 글자 길이에 따라 계산
    const columnWidths = headers.map(header => {
      const length = header.length;
      return length > 30 ? '240px' :
        length > 20 ? '200px' :
          length > 10 ? '150px' : '100px' ;
    });

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      style={{ height: containerHeight }}
    >
      <table className = {tableClassName}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th 
                key = {index} 
                className = {header.length > 20 ? 'small-text' : ''}
                style = {{width: columnWidths[index]}}
              >
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
                  <td 
                    key={colIndex} 
                    className="table-cell"
                    style={{width: columnWidths[colIndex]}}
                    >
                    <div className="cell-content">
                      {typeof cellContent === 'string' && cellContent.includes('\n')
                        ? cellContent.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i < cellContent.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          ))
                        : cellContent}
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