import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormAndTable from '../../components/FormAndTable';
import './MaterialCode/MaterialCode.css'; // 수정된 경로

const MaterialInventory = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch vocabulary data from API
    const fetchVocData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/vocInfo', {
                headers: {
                    'Accept': '*/*'
                }
            });

            if (Array.isArray(response.data)) {
                setRows(response.data);
            }
        } catch (err) {
            console.error('소재 코드 불러오기 실패:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchVocData();
    }, []);

    // Dynamically set headers based on data
    const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

    return (
        <div className="material-code-container">
            <FormAndTable headers={headers} rows={rows} loading={loading} />
        </div>
    );
};

export default MaterialInventory;