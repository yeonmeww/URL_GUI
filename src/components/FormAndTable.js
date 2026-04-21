import React, { useEffect, useState } from 'react';
import SearchBox from '../Pages/SearchBox';
import InfoTable from '../Pages/InfoTable';

const FormAndTable = ({ jsonPath, headers: propHeaders, rows: propRows, buttonConfig = {} }) => {
    const [infoFields, setInfoFields] = useState([]);
    const [searchBoxData, setSearchBoxData] = useState({});
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        if (jsonPath) {
            fetch(jsonPath)
                .then(res => {
                    if (!res.ok) { throw new Error('네트워크 응답이 올바르지 않습니다.'); }
                    return res.json();
                })
                .then(data => {
                    let processedData = [];
                    if (data.info) { processedData = data.info; }
                    else if (Array.isArray(data)) { processedData = data; }
                    else if (typeof data === 'object' && data !== null) { processedData = [data]; }

                    if (processedData.length > 0) {
                        const fields = Object.keys(processedData[0]);
                        setInfoFields(fields);
                        const emptyData = fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
                        setSearchBoxData(emptyData);
                        const formattedRows = processedData.map((item, i) => ({
                            Id: i + 1,
                            ...fields.reduce((obj, key) => { obj[key] = item[key] ?? ''; return obj; }, {})
                        }));
                        setRows(formattedRows);
                    }
                    setIsLoading(false);
                })
                .catch(err => { console.error('🚨 JSON 로드 실패:', err); setIsLoading(false); });
        }
        else if (propHeaders && propRows) {
            setInfoFields(propHeaders);
            setRows(propRows);
            const emptyData = propHeaders.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
            setSearchBoxData(emptyData);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, [jsonPath, propHeaders, propRows]);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('정보가 저장되었습니다!');
        console.log('저장된 정보:', searchBoxData);
    };

    if (isLoading) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    if (infoFields.length === 0 || rows.length === 0) {
        return <div>데이터가 없습니다.</div>;
    }

    // ✨ 최상위 div를 React Fragment(<>)로 변경하여 배경 중첩 문제 해결
    return (
        <>
            <SearchBox
                SearchBoxData={searchBoxData}
                setSearchBoxData={setSearchBoxData}
                onSubmit={handleSubmit}
                fields={infoFields}
                buttonConfig={buttonConfig}
            />
            <div className="data-content">
                <section className="user-table">
                    <InfoTable headers={infoFields} data={rows} />
                </section>
            </div>
        </>
    );
};

export default FormAndTable;