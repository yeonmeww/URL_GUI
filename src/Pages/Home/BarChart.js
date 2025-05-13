// components/BarChart.js
import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({
  data,
  keys,
  indexBy,
  legendNames = {},
  xLegend = 'X축 항목',
  yLegend = 'Y축 값',
  chartHeight = 370,
  margin = { top: 10, right: 220, bottom: 50, left: 50 },
  padding = 0.2,
  groupMode = 'grouped',
  showLegends = true,
}) => {
  const defaultColors = ['#B8D597', '#EAC3CC', '#B5D1F9', '#F1DB84'];
  const colorMap = Object.fromEntries(
    keys.map((key, index) => [key, defaultColors[index % defaultColors.length]])
  );

  
  const [activeKeys, setActiveKeys] = useState(keys);

  const toggleKey = (key) => {
    setActiveKeys((prev) => {
      const updated = prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];
  
      // 정렬 유지: keys 배열 기준으로 정렬
      return keys.filter(k => updated.includes(k));
    });
  };
  

  const maxDataValue = Math.max(...data.flatMap(d => keys.map(k => d[k] || 0)));
  const roundedMax = Math.ceil(maxDataValue / 100) * 100;

  return (
    <div style={{ height: '500px', width: '900px', marginBottom: '10px', position: 'relative' }}>
      <div className="chart-title">참여연구기관별 데이터 수집 현황
      </div>
      <ResponsiveBar
        data={data}
        keys={activeKeys}
        indexBy={indexBy}
        margin={margin}
        padding={padding}
        groupMode={groupMode}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ id }) => colorMap[id]}
        maxValue={roundedMax}
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
        labelTextColor="Black"
        legends={[]} // 기본 legend 제거
        theme={{
          axis: {
            ticks: {
              text: {
                fill: '#000000',
                fontSize: 12,
              },
            },
            legend: {
              text: {
                fill: '#000000',
                fontSize: 14,
              },
            },
          },
          legends: {
            text: {
              fill: '#000000',
              fontSize: 13,
            },
          },
          labels: {
            text: {
              fill: '#000000',
              fontSize: 11,
            },
          },
          tooltip: {
            container: {
              background: '#FFF',
              color: '#000000',
              fontSize: 13,
            },
          },
        }}
        role="application"
        ariaLabel="막대 그래프"
        barAriaLabel={e => `${e.id}: ${e.formattedValue} in ${e.indexValue}`}
      />

     {/* 사용자 정의 범례 */}
      <div className="custom-legend">
      {keys.map((key) => (
        <div
          key={key}
          onClick={() => toggleKey(key)}
          className={`legend-item ${activeKeys.includes(key) ? 'active' : ''}`}
        >
          <div
            className="legend-icon"
            style={{ backgroundColor: colorMap[key] }}
          />
          {legendNames[key] || key}
        </div>
      ))}


        {/* 전체 보기 버튼 */}
        <button
          onClick={() => setActiveKeys(keys)}
          className="show-all-button"
        >
          View All
        </button>
      </div>

      </div>

  );
};

export default BarChart;