import React, { useEffect, useState } from 'react';
import SearchBox from '../Pages/SearchBox';
import InfoTable from '../Pages/InfoTable';
const FormAndTable = ({ jsonPath }) => {
  const [infoFields, setInfoFields] = useState([]);
  const [searchBoxData, setSearchBoxData] = useState({});
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetch(jsonPath)
      .then(res => res.json())
      .then(data => {
        if (!data.info || data.info.length === 0) return;
        const fields = Object.keys(data.info[0]);
        setInfoFields(fields);
        const emptyData = fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
        setSearchBoxData(emptyData);
        const formattedRows = data.info.map((item, i) => ({
          Id: i + 1,
          ...fields.reduce((obj, key) => {
            obj[key] = item[key] ?? '';
            return obj;
          }, {})
        }));
        setRows(formattedRows);
      })
      .catch(err => console.error('🚨 JSON 로드 실패:', err));
  }, [jsonPath]);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('정보가 저장되었습니다!');
    console.log('저장된 정보:', searchBoxData);
  };
  if (infoFields.length === 0 || Object.keys(searchBoxData).length === 0) {
    return <div>Loading data...</div>;
  }
  return (
    <div className="user-info">
      <SearchBox
        SearchBoxData={searchBoxData}
        setSearchBoxData={setSearchBoxData}
        onSubmit={handleSubmit}
        fields={infoFields}
      />
      <div className="data-content">
        <section className="user-table">
          <InfoTable headers={infoFields} data={rows} />
        </section>
      </div>
    </div>
  );
};
export default FormAndTable;