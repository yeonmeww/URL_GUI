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
    const yMaxRounded = Math.ceil((maxY + 10) / 10) * 10;

    // 10단위로 눈금 생성
    const tickValues = Array.from(
        { length: Math.ceil(yMaxRounded / 10) + 1 },
        (_, i) => i * 10
    );

    return (
        <div style={{ height: 400 }}>
            <ResponsiveLine
                data={formattedData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
                        symbolSize: 6, // 동그라미 절반 크기
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
                        items: formattedData.map((serie) => ({
                            ...serie,
                            legendSymbol: (
								<svg width="85" height="20">
									<line
										x1="0"
										y1="10"
										x2="75" // 동그라미 중심보다 살짝 더 뒤까지
										y2="10"
										stroke={serie.color}
										strokeWidth="2"
									/>
									<circle cx="70" cy="10" r="2.5" fill={serie.color} />
								</svg>

                            ),
                        })),
                    },
                ]}
            />
        </div>
    );
};

export default LineChart;
