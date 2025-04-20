import React from 'react';
import './InfoTable.css';

// 더 유연한 InfoTable 컴포넌트 (텍스트 줄바꿈 기능 강화)
const InfoTable = ({
  headers = [], // 테이블 헤더를 동적으로 받음
  data = [],    // 테이블 데이터를 동적으로 받음
  containerClassName = "table-container",
  tableClassName = "table"
}) => {
  return (
    <div className={containerClassName}>
      <table className={tableClassName}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
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
                    {/* 텍스트 줄바꿈이 유지되도록 함 */}
                    <div className="cell-content">
                      {/* 줄바꿈 문자가 있는 경우 처리 */}
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