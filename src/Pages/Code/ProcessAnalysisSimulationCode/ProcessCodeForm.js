import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormAndTable from '../../../components/FormAndTable';


const ProcessCodeForm = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('http://13.125.96.124:8080/api/v1/processCode')
            .then(function (res){
                if (res.data && res.data.data) {
                    setRows(res.data.data);
                }
                console.log('API 원본 응답:', res);
            })
            .catch((err) => {
                console.error('소재 코드 불러오기 실패:', err);
            });
    }, []);

    // 렌더링 시 현재 rows 값 확인
    console.log('rows 상태:', rows);

    return (
        <FormAndTable jsonPath="/ProcessCodeForm.json" />
    );
};

export default ProcessCodeForm;