import React from 'react';
import FormAndTable from '../../../components/FormAndTable'; // 경로는 프로젝트 구조에 따라 조정
import './ProAnaSimulCode.css';

const SimulationCodeForm = () => {
  return (

        <FormAndTable jsonPath="/SimulationCodeForm.json" />
  );
};

export default SimulationCodeForm;
