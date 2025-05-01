import { ResponsiveLine } from '@nivo/line';

const LineChart = ({ data }) => {
    if (!data || data.length === 0) return null;

    // "총합" 데이터 제거
    const filtered = data.filter(d => d.년도 !== '총합');

    // 데이터 구조 변환 (대학별 시리즈로)
    const keys = Object.keys(filtered[0]).filter(k => !['년도', '월'].includes(k));
    const formattedData = keys.map(key => ({
        id: key,
        data: filtered.map(row => ({
            x: `${row.월}월`,
            y: row[key],
        })),
    }));

    // 전체 y값 중 최대값 계산
    const allValues = formattedData.flatMap(series => series.data.map(point => point.y));
    const maxY = Math.max(...allValues);

     // 최대값에 따라 interval 설정
     let interval;
     if (maxY <= 10) {
         interval = 1;
     } else if (maxY <= 30) {
         interval = 5;
     } else {
         interval = 10;
     }

    // y축 최대값 (올림 처리)
    const yMaxRounded = Math.ceil((maxY + interval) / interval) * interval;

    // tickValues 생성
    const tickValues = Array.from(
        { length: Math.ceil(yMaxRounded / interval) + 1 },
        (_, i) => i * interval
    );

    return (
        <div style={{ height: 400 }}>
            <ResponsiveLine
                data={formattedData}
                margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: yMaxRounded,
                    stacked: false,
                    reverse: false,
                }}
                curve="linear"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    legend: '월',
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '데이터 수',
                    legendOffset: -40,
                    legendPosition: 'middle',
                    tickValues: tickValues,
                }}
                tooltip={({ point }) => (
                    <div
                        style={{
                            background: 'white',
                            padding: '6px 9px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '12px',
                        }}
                    >
                        <strong>{point.serieId}</strong><br />
                        {point.data.xFormatted}, {point.data.yFormatted}개
                    </div>
                )}
                gridYValues={tickValues}
                colors={{ scheme: 'category10' }}
                pointSize={5}
                pointColor={{ from: 'color' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'color' }}
                enablePoints={true}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        translateX: 100,
                        itemWidth: 80,
                        itemHeight: 20,
                        symbolSize: 6,
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
            />
        </div>
    );
};

export default LineChart;
