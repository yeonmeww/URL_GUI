import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import FormAndTable from '../../components/FormAndTable';

const EquipmentCode = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef(null);
    const limit = 10; // 한 번에 불러올 데이터 수

    const fetchEquipmentData = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get('http://13.125.96.124:8080/api/v1/equipmentCode', {
                params: { page, limit }
            });

            // API 응답 데이터가 res.data에 직접 들어있다고 가정하고 수정
            const newFetchedData = response.data;

            if (Array.isArray(newFetchedData)) {
                setRows(prevData => [...prevData, ...newFetchedData]);
                if (newFetchedData.length < limit) {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error('장비 코드 불러오기 실패:', err);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEquipmentData();
    }, [page]); // page 값이 변경될 때마다 데이터를 새로 불러옵니다.

    // 스크롤 감지 로직
    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                if (scrollTop + clientHeight >= scrollHeight - 50 && !loading && hasMore) {
                    setPage(prevPage => prevPage + 1);
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => container && container.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    // rows 상태의 첫 번째 객체를 기반으로 헤더를 동적으로 추출합니다.
    const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

    return (
        <div ref={containerRef} className="equipment-code-container">
            {/* FormAndTable 컴포넌트에 headers와 rows를 직접 전달합니다. */}
            <FormAndTable headers={headers} rows={rows} loading={loading} hasMore={hasMore} />
        </div>
    );
};

export default EquipmentCode;