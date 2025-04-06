import { Position } from "reactflow";

const nodeStyles = {
  Material: {
    label: 'Material',
    style: {
      background: '#B7D2DE',
      borderRadius: '50%', // 동그라미
      width: 100,
      height: 100,
      textAlign: 'center',
      fontWeight: 'bold',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    }, 

    
  },
  Product: {
    label: 'Product',
    style: {
      background: '#DEDCDC',
      borderRadius: '0px', // 네모
      width: 200,
      height: 80,
      textAlign: 'center',
      fontWeight: 'bold',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  Process: {
    label: 'Process',
    style: {
      background: '#EBCDCF',
      borderRadius: '10px', // 살짝 둥근 네모
      width: 100,
      height: 80,
      textAlign: 'center',
      fontWeight: 'bold',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  Simulation: {
    label: 'Simulation',
    style: {
      background: '#D6CCD9',
      borderRadius: '25% 0', // 비대칭 스타일
      width: 100,
      height: 80,
      textAlign: 'center',
      fontWeight: 'bold',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  Analysis: {
    label: 'Analysis',
    style: {
      background: '#CEE4B4',
      borderRadius: '10px', // 살짝 둥근 네모
      width: 80,
      height: 80,
      textAlign: 'center',
      fontWeight: 'bold',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
  },
  Result: {
    label: 'Result',
    style: {
      background: '#F7E3C4',
      borderRadius: '50% 0', // 독특한 모양
      width: 100,
      height: 80,
      textAlign: 'center',
      fontWeight: 'bold',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
};

export default nodeStyles;
