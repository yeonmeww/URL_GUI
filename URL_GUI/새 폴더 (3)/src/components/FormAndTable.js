import React, { useEffect, useState } from 'react';
import Info from '../Pages/Info'; // 위치에 따라 조정
import Table from '../Pages/Table';       // Table 위치에 따라 조정
//import '../Code.css';

const FormAndTable = ({ jsonPath }) => {
    const [infoFields, setInfoFields] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch(jsonPath)
            .then(res => res.json())
            .then(data => {
                if (!data.user || data.user.length === 0) return;

                const fields = Object.keys(data.user[0]);
                setInfoFields(fields);
                setUserInfo(fields.reduce((obj, field) => ({ ...obj, [field]: '' }), {}));

                const formattedRows = data.user.map((user, i) => ({
                    Id: i + 1,
                    ...fields.reduce((obj, key) => {
                        obj[key] = user[key] ?? '';
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
        console.log('저장된 정보:', userInfo);
    };

    if (infoFields.length === 0) return <div>Loading...</div>;

    return (
        <div className="user-info">
            <Info
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                onSubmit={handleSubmit}
                fields={infoFields}
            />
            <div className="data-content">
                <section className="user-table">
                    <Table headers={infoFields} data={rows} />
                </section>
            </div>
        </div>
    );
};

export default FormAndTable;
