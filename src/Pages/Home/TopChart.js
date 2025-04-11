import { ResponsiveLine } from '@nivo/line';

const TopChart = ({ data }) => {
    return (
        <div style={{ height: '270px', marginBottom: '10px' }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5, tickPadding: 5, legend: '교통수단', legendOffset: 36, legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 5, tickPadding: 5, legend: '사용량', legendOffset: -40, legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableTouchCrosshair
                useMesh
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
                                style: { itemBackground: 'rgba(0, 0, 0, .03)', itemOpacity: 1 }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
};

export default TopChart;