// Home.js
import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';

//import React from 'react';


const Home = () => {


    const [lineData, setLineData] = useState(null);
    const [pieData, setPieData] = useState(null);

    useEffect(() => {
        // ✅ Line Chart 데이터 로드
        fetch('/output.json')
            .then(res => res.json())
            .then(json => setLineData(json))
            .catch(err => {
                console.error('output.json 로딩 실패:', err);
            });

        // ✅ Pie Chart 데이터 로드
        fetch('/output2.json')
            .then(res => res.json())
            .then(json => setPieData(json))
            .catch(err => {
                console.error('output2.json 로딩 실패:', err);
            });
    }, []);

    return (
        <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>

            <div style={{ flex: 2, border: '2px solid black', borderRadius: '16px', padding: '20px' }}>
                <h3 style={{ borderBottom: 'none', textDecoration: 'none' }}>Data Dash Board</h3>

                <div style={{ height: '270px', marginBottom: '10px' }}>
                    {lineData ? (
                        <ResponsiveLine
                            data={lineData}
                            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                            xScale={{ type: 'point' }}
                            yScale={{
                                type: 'linear',
                                min: 'auto',
                                max: 'auto',
                                stacked: true,
                                reverse: false
                            }}
                            yFormat=" >-.2f"
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: '교통수단',
                                legendOffset: 36,
                                legendPosition: 'middle'
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: '사용량',
                                legendOffset: -40,
                                legendPosition: 'middle'
                            }}
                            pointSize={10}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor' }}
                            pointLabel="data.yFormatted"
                            pointLabelYOffset={-12}
                            enableTouchCrosshair={true}
                            useMesh={true}
                            colors={{ scheme: 'category10' }}
                            legends={[
                                {
                                    anchor: 'bottom-right',
                                    direction: 'column',
                                    translateX: 100,
                                    itemWidth: 80,
                                    itemHeight: 20,
                                    itemOpacity: 0.75,
                                    symbolSize: 12,
                                    symbolShape: 'circle',
                                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemBackground: 'rgba(0, 0, 0, .03)',
                                                itemOpacity: 1
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                    ) : (
                        <p></p>
                    )}
                </div>

                <div style={{ height: '250px' }}>
                    {pieData ? (
                        <ResponsivePie
                            data={pieData}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            colors={{ datum: 'data.color' }}
                            borderColor={{
                                from: 'color',
                                modifiers: [['darker', 0.2]]
                            }}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{
                                from: 'color',
                                modifiers: [['darker', 2]]
                            }}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    translateY: 56,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000'
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                    ) : (
                        <p></p>
                    )}
                </div>
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
