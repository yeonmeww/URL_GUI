import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormAndTable from '../../../components/FormAndTable';
import './ProAnaSimulCode.css';

const AnalysisCodeForm = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    // hasMore 상태는 현재 코드에서 큰 의미는 없지만, FormAndTable 컴포넌트에서 prop으로 요구할 수 있어 유지했습니다.
    const [hasMore, setHasMore] = useState(false);

    const fetchAnalysisData = async () => {
        setLoading(true);
        try {
            // 1. API URL을 'analysisCodeView'로 수정
            const response = await axios.get('http://localhost:8080/api/v1/analysisCodeView');
            const newFetchedData = response.data;

            if (Array.isArray(newFetchedData)) {
                setRows(newFetchedData);
            } else {
                setRows([]);
                // API 응답이 배열이 아닌 경우, 개발자 도구의 Network 탭에서 실제 응답을 확인해야 합니다.
                console.warn("API 응답이 배열 형태가 아닙니다. 백엔드 팀과 확인하세요.");
            }
        } catch (err) {
            console.error('분석 코드 불러오기 실패:', err);
            setRows([]);
        } finally {
            setLoading(false);
            setHasMore(false); // 데이터 로드가 완료되었으므로 추가 데이터는 없음
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