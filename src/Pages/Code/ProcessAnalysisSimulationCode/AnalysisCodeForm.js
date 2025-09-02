import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormAndTable from '../../../components/FormAndTable';
import './ProAnaSimulCode.css';

const AnalysisCodeForm = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const fetchAnalysisData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://13.125.96.124:8080/api/v1/analysisCode');
            const newFetchedData = response.data;

            if (Array.isArray(newFetchedData)) {
                setRows(newFetchedData);
                setHasMore(false);
            } else {
                setRows([]);
                setHasMore(false);
                // API 응답이 배열이 아닌 경우, 개발자 도구의 Network 탭에서 실제 응답을 확인해야 합니다.
                console.warn("API 응답이 배열 형태가 아닙니다. 백엔드 팀과 확인하세요.");
            }
        } catch (err) {
            console.error('분석 코드 불러오기 실패:', err);
            setRows([]);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalysisData();
    }, []);

    const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

    return (
        <div className="analysis-code-container">
            <FormAndTable headers={headers} rows={rows} loading={loading} hasMore={hasMore} />
        </div>
    );
};

export default AnalysisCodeForm;