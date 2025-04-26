// components/BarChart.js
import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({
  data,
  keys,
  indexBy,
  legendNames = {}, // Add legendNames prop to customize legend display names
  xLegend = 'X축 항목',
  yLegend = 'Y축 값',
  chartHeight = 270,
  margin = { top: 50, right: 130, bottom: 50, left: 60 }, // Increased right margin for longer legend text
  padding = 0.2,
  groupMode = 'grouped', // or 'stacked'
  colors = { scheme: 'category10' },
  showLegends = true,
}) => {
  return (
    <div style={{ height: `${chartHeight}px`, marginBottom: '10px' }}>
      {/* 차트 제목을 '데이터집계'로 변경 */}
      <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>
        데이터집계
      </h3>
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
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={
          showLegends
            ? [
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  translateX: 120,
                  itemWidth: 120, // Increased width for longer Korean text
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 6,
                  symbolShape: 'circle',
                  // Custom mapping for legend labels
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