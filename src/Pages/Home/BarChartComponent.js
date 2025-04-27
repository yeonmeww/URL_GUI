// components/BarChartComponent.js
import BarChart from './BarChart';

const BarChartComponent = ({ data, legendNames }) => {
  const keys = ['Image', 'Work_Order', 'Binary_File', 'Process_Recipe'];
  
  // Use the passed legendNames or fallback to default if not provided
  const defaultLegendNames = {
    'Image': 'Image 수',
    'Work_Order': 'WorkOrder 실행 수',
    'Binary_File': 'Binary File 수',
    'Process_Recipe': 'ProcessRecipe 수'
  };
  
  const finalLegendNames = legendNames || defaultLegendNames;

  return (
    <BarChart
      data={data}
      keys={keys}
      indexBy="Institution"
      legendNames={finalLegendNames}
      xLegend="기관"
      yLegend="수집 데이터 개수"
    />
  );
};

export default BarChartComponent;