import React from 'react';
import FormAndTable from '../../components/FormAndTable';

const Analysis = () => {
    // Download 버튼 설정은 그대로 유지합니다.
    const buttonConfig = {
        showDownload: true,
    };

    // ✨ className="user-info" div로 감싸서 CSS 스타일을 적용합니다.
    return (
        <div className="user-info">
            <FormAndTable
                jsonPath="/Analysis.json"
                buttonConfig={buttonConfig}
            />
        </div>
    );
};

export default Analysis;