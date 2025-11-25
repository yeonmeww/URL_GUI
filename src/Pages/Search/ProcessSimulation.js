import React from 'react';
import FormAndTable from '../../components/FormAndTable';

const ProcessSimulation = () => {
    // Download 버튼 설정은 그대로 유지합니다.
    const buttonConfig = {
        showDownload: true,
    };

    // ✨ className="user-info" div로 감싸줍니다.
    return (
        <div className="user-info">
            <FormAndTable
                jsonPath="/ProcessSimulation.json"
                buttonConfig={buttonConfig}
            />
        </div>
    );
};

export default ProcessSimulation;