// Home.js

import React, { useState, useEffect } from 'react';
import TopChart from './TopChart';
import BottomChart from './BottomChart';

const Home = () => {
    const [TopData, setTopData] = useState(null);
    const [BottomData, setBottomData] = useState(null);

    useEffect(() => {
        fetch('/TopOutput.json')
            .then(res => res.json())
            .then(setTopData)
            .catch(err => console.error('TopOutput.json 로딩 실패:', err));

        fetch('/BottomOutput.json')
            .then(res => res.json())
            .then(setBottomData)
            .catch(err => console.error('BottomOutput.json 로딩 실패:', err));
    }, []);

    return (
        <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
            <div style={{ flex: 2, border: '2px solid black', borderRadius: '16px', padding: '20px' }}>
                <h3 style={{ borderBottom: 'none', textDecoration: 'none' }}>Data Dash Board</h3>

                {TopData && <TopChart data={TopData} />}
                {BottomData && <BottomChart data={BottomData} />}
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <h4><b>News!</b></h4>
                    <div style={{ height: '200px', border: '1px solid black' }} />
                </div>
                <div>
                    <h4><b>News!</b></h4>
                    <div style={{ height: '200px', border: '1px solid black' }} />
                </div>
            </div>
        </div>
    );
};

export default Home;

