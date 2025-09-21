import React from 'react';
import FormAndTable from '../../components/FormAndTable';

const Search = () => {
    // Download 버튼을 표시하기 위한 설정
    const buttonConfig = {
        showDownload: true,
    };

    return (
        <FormAndTable
            jsonPath="/Search.json"
            buttonConfig={buttonConfig} // prop을 전달
        />
    );
};

export default Search;