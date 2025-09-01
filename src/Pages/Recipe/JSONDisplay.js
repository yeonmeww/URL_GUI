import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const SubHeader = () => {
    return <div></div>;
};

const JSONDisplay = () => {
    const [initialData, setInitialData] = useState([]);
    const [initialHeaders, setInitialHeaders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef(null);
    const limit = 10; // 한 번에 불러올 데이터 수

    const fetchInitialData = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get(
                'http://13.125.96.124:8080/api/v1/recipeInfoCollected',
                {
                    params: {
                        page: page,
                        limit: limit
                    }
                }
            );

            const newFetchedData = response.data;
            if (Array.isArray(newFetchedData)) {
                setInitialData(prevData => [...prevData, ...newFetchedData]);

                if (newFetchedData.length < limit) {
                    setHasMore(false); // 더 이상 불러올 데이터가 없으면 false로 설정
                }

                if (initialHeaders.length === 0 && newFetchedData.length > 0) {
                    setInitialHeaders(Object.keys(newFetchedData[0]));
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to load initial data:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
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
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading, hasMore]);

    const renderTable = (headers, data) => {
        if (data.length === 0 && !loading) return <p>표시할 데이터가 없습니다.</p>;

        return (
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '12px', textAlign: 'center' }}>
                <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header} style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header) => (
                            <td key={header} style={{ border: '1px solid #ccc', padding: '8px' }}>
                                {row[header] ?? ''}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    return (
        <div
            ref={containerRef}
            className="json-display-container"
        >
            <SubHeader />
            <h3>전체 목록 (General)</h3>
            {renderTable(initialHeaders, initialData)}
            {loading && <p>데이터를 불러오는 중입니다...</p>}
            {!hasMore && <p>모든 데이터를 불러왔습니다.</p>}
        </div>
    );
};

export default JSONDisplay;

/*
// --- 아래는 주석으로 처리된 recipeInfoCollected 엔드포인트를 위한 코드 예시입니다. ---
const RecipeInfoCollectedDisplay = () => {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);

    const fetchData = async () => {
        try {
            // recipeInfoCollected 데이터를 가져올 API 엔드포인트입니다.
            const response = await axios.get('http://13.125.96.124:8080/api/v1/recipeInfoCollected');

            const fetchedData = response.data;
            if (Array.isArray(fetchedData)) {
                setData(fetchedData);
                if (fetchedData.length > 0) {
                    setHeaders(Object.keys(fetchedData[0]));
                }
            }
        } catch (error) {
            console.error('Failed to load recipeInfoCollected data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderTable = (headers, data) => {
        if (data.length === 0) return <p>데이터가 없습니다.</p>;

        return (
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '12px', textAlign: 'center' }}>
                <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header} style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header) => (
                            <td key={header} style={{ border: '1px solid #ccc', padding: '8px' }}>
                                {row[header] ?? ''}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="json-display-container">
            <h3>레시피 정보 (Recipe Info Collected)</h3>
            {renderTable(headers, data)}
        </div>
    );
};
// --- 주석 처리된 RecipeInfoCollectedDisplay 컴포넌트 끝 ---
*/