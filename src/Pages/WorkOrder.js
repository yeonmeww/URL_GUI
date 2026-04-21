import React from 'react';
import FormAndTable from '../components/FormAndTable'; // 1단계만 위로 올라가서 components 폴더를 찾습니다.

const WorkOrder = () => {
    // ✨ className="user-info" div로 감싸줍니다.
    return (
        <div className="user-info">
            <FormAndTable jsonPath="/WorkOrder.json" />
        </div>
    );
};

export default WorkOrder;