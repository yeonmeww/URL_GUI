import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormAndTable from '../../../components/FormAndTable';
import './MaterialCode.css';

const MaterialCodeForm = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    // API로부터 데이터를 가져오는 함수
    const fetchCodeData = async () => {
        setLoading(true); // 로딩 시작
        try {
            // 1. API URL을 'materialCodeView'로 수정하고, 페이지네이션 파라미터 제거
            const response = await axios.get('http://localhost:8080/api/v1/materialCodeView');

            // 2. 전체 데이터를 한 번에 받아 state에 저장
            if (Array.isArray(response.data)) {
                setRows(response.data);
            }
        } catch (err) {
            console.error('소재 코드 불러오기 실패:', err);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    // 3. 컴포넌트가 처음 마운트될 때 한 번만 데이터를 가져오도록 변경
    useEffect(() => {
        fetchCodeData();
    }, []); // 의존성 배열을 비워두어 최초 1회만 실행

    // 헤더 정보는 기존 로직과 동일
    const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

    // 4. 무한 스크롤 관련 ref와 hasMore prop 제거
    return (
        <div className="material-code-container">
            <FormAndTable headers={headers} rows={rows} loading={loading} />
        </div>
    );
};

export default MaterialCodeForm;