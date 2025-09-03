import React, { useEffect, useState } from 'react';
import SearchBox from '../Pages/SearchBox';
import InfoTable from '../Pages/InfoTable';

// jsonPath, headers, rows 중 하나를 받도록 props를 유연하게 설정
const FormAndTable = ({ jsonPath, headers: propHeaders, rows: propRows }) => {
    const [infoFields, setInfoFields] = useState([]);
    const [searchBoxData, setSearchBoxData] = useState({});
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        // jsonPath prop이 있을 경우: 데이터를 직접 fetch
        if (jsonPath) {
            fetch(jsonPath)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('네트워크 응답이 올바르지 않습니다.');
                    }
                    return res.json();
                })
                .then(data => {
                    // API 응답 데이터가 다양한 형식일 수 있으므로 배열로 통일
                    let processedData = [];
                    if (data.info) {
                        processedData = data.info;
                    } else if (Array.isArray(data)) {
                        processedData = data;
                    } else if (typeof data === 'object' && data !== null) {
                        processedData = [data];
                    }

                    if (processedData.length > 0) {
                        const fields = Object.keys(processedData[0]);
                        setInfoFields(fields);
                        const emptyData = fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
                        setSearchBoxData(emptyData);
                        const formattedRows = processedData.map((item, i) => ({
                            Id: i + 1,
                            ...fields.reduce((obj, key) => {
                                obj[key] = item[key] ?? '';
                                return obj;
                            }, {})
                        }));
                        setRows(formattedRows);
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error('🚨 JSON 로드 실패:', err);
                    setIsLoading(false);
                });
        }
        // headers와 rows prop이 있을 경우: 외부 데이터를 사용
        else if (propHeaders && propRows) {
            setInfoFields(propHeaders);
            setRows(propRows);
            const emptyData = propHeaders.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
            setSearchBoxData(emptyData);
            setIsLoading(false);
        } else {
            // 유효한 데이터 소스가 없을 경우
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

    // 데이터가 없는 경우
    if (infoFields.length === 0 || rows.length === 0) {
        return <div>데이터가 없습니다.</div>;
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