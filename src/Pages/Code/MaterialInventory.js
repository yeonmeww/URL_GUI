import React from 'react';
import FormAndTable from '../../components/FormAndTable';

const MaterialInventory = () => {
    return (
        <div className="user-info">
            <FormAndTable jsonPath="/MaterialInventory.json" />
        </div>
    );
};

export default MaterialInventory;