import React from 'react';

import { ResponsiveBar } from '@nivo/bar';

const TopChart = ({ data }) => {
    return (
        <div style={{ height: '', marginBottom: '10px' }}>
            <ResponsiveBar
    data={data}
    keys={['image', 'video', 'work order', 'result']}
    indexBy="institution"
    margin={{ top: 10, right: 160, bottom: 50, left: 60 }}
    padding={0.6}
    groupMode="grouped" 
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'category10' }}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        legend: '기관',
        legendPosition: 'middle',
        legendOffset: 36,
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        legend: '수집 데이터 개수',
        legendPosition: 'middle',
        legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor="Black" //
    legends={[
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ]}
    role="application"
    ariaLabel="기관별 항목 그룹 막대그래프"
    barAriaLabel={e => `${e.id}: ${e.formattedValue} in ${e.indexValue}`}
/>

        </div>
    );
};

export default TopChart;