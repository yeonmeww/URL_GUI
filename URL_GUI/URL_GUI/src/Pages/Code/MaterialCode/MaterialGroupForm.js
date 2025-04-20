import React from 'react';
import FormAndTable from '../../../components/FormAndTable'; // 실제 위치에 맞게 경로 조정
import './MaterialCode.css';

const MaterialGroupForm = () => {
    return (

            <FormAndTable jsonPath="/MaterialGroupForm.json" />

    );
};

export default MaterialGroupForm;
