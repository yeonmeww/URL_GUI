import React from 'react';
import FormAndTable from '../../components/FormAndTable';

const ProviderCode = () => {
    return (
        <div className="user-info">
            <FormAndTable jsonPath="/ProviderCode.json" />
        </div>
    );
};

export default ProviderCode;