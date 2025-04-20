import React from 'react';
import FormAndTable from '../../../components/FormAndTable'; // 경로는 프로젝트 구조에 따라 조정
import './MaterialCode.css';

const MaterialCodeForm = () => {
  return (

        <FormAndTable jsonPath="/MaterialCodeForm.json" />

  );
};

export default MaterialCodeForm;
