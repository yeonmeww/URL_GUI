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
                const response = await axios.get('http://13.125.96.124:8080/api/v1/user');
                const userData = response.data;

                // API 응답이 배열인지 확인하고, 아니면 배열로 변환
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

    // 로딩 중이거나 에러가 발생했을 때의 UI
    if (isLoading) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    if (error) {
        return <div>오류: {error}</div>;
    }

    // 데이터가 없으면 빈 테이블 표시
    if (rows.length === 0) {
        return <div>사용자 정보가 없습니다.</div>;
    }

    return (
        <FormAndTable headers={headers} rows={rows} />
    );
};

export default UserInformation;