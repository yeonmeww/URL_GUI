import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormAndTable from '../components/FormAndTable';

const UserInformation = () => {
    const [rows, setRows] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/user');
                const userData = response.data;
                const processedData = Array.isArray(userData) ? userData : [userData];

                if (processedData.length > 0) {
                    const fetchedHeaders = Object.keys(processedData[0]);
                    setHeaders(fetchedHeaders);
                    setRows(processedData);
                } else {
                    setRows([]);
                    setHeaders([]);
                }
            } catch (err) {
                console.error('사용자 정보 불러오기 실패:', err);
                setError('사용자 정보를 불러오는 데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (isLoading) return <div>데이터를 불러오는 중입니다...</div>;
    if (error) return <div>오류: {error}</div>;
    if (rows.length === 0) return <div>사용자 정보가 없습니다.</div>;

    // ✨ className="user-info" div로 감싸줍니다.
    return (
        <div className="user-info">
            <FormAndTable headers={headers} rows={rows} />
        </div>
    );
};

export default UserInformation;