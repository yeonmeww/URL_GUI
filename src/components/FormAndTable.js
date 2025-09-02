import React, { useEffect, useState } from 'react';

import SearchBox from '../Pages/SearchBox';

import InfoTable from '../Pages/InfoTable';



// headers와 rows를 직접 props로 받습니다.

const FormAndTable = ({ headers, rows }) => {

    const [searchBoxData, setSearchBoxData] = useState({});



    // headers가 유효한지 먼저 확인합니다.

    useEffect(() => {

        // headers가 null 또는 undefined가 아닌지 확인

        if (headers && headers.length > 0) {

            const emptyData = headers.reduce((acc, field) => ({ ...acc, [field]: '' }), {});

            setSearchBoxData(emptyData);

        }

    }, [headers]);



    const handleSubmit = (e) => {

        e.preventDefault();

        alert('정보가 저장되었습니다!');

        console.log('저장된 정보:', searchBoxData);

    };



    // headers와 rows가 유효할 때만 컴포넌트를 렌더링합니다.

    if (!headers || headers.length === 0 || !rows || rows.length === 0) {

        return <div>데이터를 불러오는 중입니다...</div>;

    }



    return (

        <div className="user-info">

            <SearchBox

                SearchBoxData={searchBoxData}

                setSearchBoxData={setSearchBoxData}

                onSubmit={handleSubmit}

                fields={headers}

            />

            <div className="data-content">

                <section className="user-table">

                    <InfoTable headers={headers} data={rows} />

                </section>

            </div>

        </div>

    );

};



export default FormAndTable;