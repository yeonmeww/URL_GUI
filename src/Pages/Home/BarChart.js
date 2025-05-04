// components/BarChart.js


import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({
  data,
  keys,
  indexBy,
  legendNames = {}, // Add legendNames prop to customize legend display names
  xLegend = 'X축 항목',
  yLegend = 'Y축 값',
  chartHeight = 370,
  margin = { top: 10, right: 160, bottom: 50, left: 50 }, // Increased right margin for longer legend text
  padding = 0.2,
  groupMode = 'grouped', // or 'stacked'
  colors = { scheme: 'category10' },
  showLegends = true,
}) => {
  return (
    <div style={{ height: '400px', width: '600px', marginBottom: '10px', position: 'relative' }}>

      {/* 차트 제목을 '데이터집계'로 변경 */}
        <div className="chart-title">기관별 데이터집계</div>
        <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={margin}
        padding={padding}
        groupMode={groupMode}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={colors}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        legend: xLegend,
        legendPosition: 'middle',
        legendOffset: 36,
    }}
        axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        legend: yLegend,
        legendPosition: 'middle',
        legendOffset: -40,
    }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="white"
        theme={{
        axis: {
            ticks: {
                text: {
                    fill: '#ffffff', // 축 숫자 색
                },
            },
            legend: {
                text: {
                    fill: '#ffffff', // 축 이름 색
                },
            },
        },
        legends: {
            text: {
                fill: '#ffffff', // 범례 텍스트 색
            },
        },
        labels: {
            text: {
                fill: '#ffffff', // 막대 내부 텍스트 색
            },
        },
        tooltip: {
            container: {
                background: '#333',
                color: '#fff',
            },
        },
    }}
        legends={
        showLegends
            ? [
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 160,
                    itemWidth: 120,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 10,
                    symbolShape: 'circle',
                    itemTextColor: '#ffffff',
                    itemsFormat: items =>
                        items.map(item => ({
                            ...item,
                            label: legendNames[item.id] || item.id,
                        })),
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
            ]
            : []
    }
        role="application"
        ariaLabel="막대 그래프"
        barAriaLabel={e => `${e.id}: ${e.formattedValue} in ${e.indexValue}`}
        />
    </div>
  );
};

export default BarChart;