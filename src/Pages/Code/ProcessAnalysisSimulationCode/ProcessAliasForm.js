import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormAndTable from '../../../components/FormAndTable';


const ProcessAliasForm = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('http://13.125.96.124:8080/api/v1/ProcessAlias')
            .then(function (res){
                if (res.data && res.data.data) {
                    setRows(res.data.data);
                }
                console.log(res);
            })
            .catch((err) => {
                console.error('❌ 소재 코드 불러오기 실패:', err);
            });
    }, []); // 빈 배열 → 최초 렌더링 시 1번만 실행됨

    return (
        <FormAndTable jsonPath="/ProcessAliasForm.json" />
    );
};

export default ProcessAliasForm;