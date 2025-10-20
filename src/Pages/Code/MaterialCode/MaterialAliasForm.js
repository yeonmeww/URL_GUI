import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import FormAndTable from '../../../components/FormAndTable';
import './MaterialCode.css';

const MaterialAliasForm = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef(null);
    const limit = 10;
    const fetchAliasData = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const response = await axios.get('http://13.125.96.124:8080/api/v1/materialAlias', {
                params: { page, limit }
            }); 
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
            console.error('소재 코드 불러오기 실패:', err);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAliasData();
    }, [page]);
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
    const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
    return (
        <div ref={containerRef} className="material-code-container">
            <FormAndTable headers={headers} rows={rows} loading={loading} hasMore={hasMore} />
        </div>
    );
};
export default MaterialAliasForm;