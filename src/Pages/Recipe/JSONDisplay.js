import React, { useEffect, useState } from 'react';
import { useDnD } from './DnDContext';
import axios from 'axios';


const JSONDisplay = () => {
  const [jsonData, setJsonData] = useState([]);
  const [genData, setGenData] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [genHeaders, setGenHeaders] = useState([]);
  const [blockHeaders, setBlockHeaders] = useState([]);

  const { selectedBlockId } = useDnD(); //  선택된 block_id 가져오기
  useEffect(() => {
    const fetchJsonData = async () => {
      try {
      const response_gen_tab = await axios.get('http://13.125.96.124:8080/api/v1/recipeInfoGeneral');
      const gen_table_data = response_gen_tab.data;
      if (Array.isArray(gen_table_data)) {

        if (gen_table_data.length > 0) {

          // 1. 첫 번째 항목 기준으로 !!!자동으로 !!!!!!!!! 헤더 추출
          // setHeaders(Object.keys(gen_table_data[0])); // 첫 번째 항목 기준으로 헤더 추출


          // 2. 원하는 순서대로 헤더 배열 !!수동!! 정의
          const genHeaderOrder = [
            // "block_conn_info",
            // "block_id",
            "block_no",
            "block_type",
            // "module_id",
            "module_no",
            "ord_seq_no",
            "rcp_id",
            "reference_id",
            "wo_id"
          ];

          


          // setHeaders 호출
          setGenHeaders(genHeaderOrder);
          setGenData(gen_table_data);
          console.log('gen_table_data[0]):', gen_table_data[0]);
          console.log('gen_table_data):', gen_table_data);
          
          // Filter data for rcpId "rcp_exp_250818_1"
          const dataArray = Object.values(gen_table_data);
          const filtered = dataArray.filter(item => item.rcp_id === "rcp_sim_250818_108");
          console.log('gen_table_data filtered:', filtered);
        }

        // console.log('processedData_gen:', processedData_gen);
        console.log('Successfully loaded initial data:', gen_table_data);
      }

      const response_block_tab = await axios.get('http://13.125.96.124:8080/api/v1/recipeInfoCollected');
      const block_table_data = response_block_tab.data;
      console.log('block_table_data:', block_table_data);
      if (Array.isArray(block_table_data)) {

        if (block_table_data.length > 0) {

          // 첫 번째 항목 기준으로 !!!자동으로 !!!!!!!!! 헤더 추출
          // setHeaders(Object.keys(block_table_data[0])); // 첫 번째 항목 기준으로 헤더 추출


          // 원하는 순서대로 헤더 배열 !!수동!! 정의
         const blockHeaderOrder = [
            // "wo_id",
            // "rcp_id",
            // "module_id",
            // "module_no",
            // "block_id",
            // "block_no",
            "block_type",
            // "reference_id",
            // "ord_seq_no_1",
            "ord_seq_no_2",
            "hub_voc_id",
            "eco_voc_id",
            "voc_level_1",
            "voc_level_2",
            // "voc_level_3",
            // "voc_level_4",
            "voc_name",
            "voc_value",
            // "voc_unit"
          ];


          // setHeaders 호출
          setBlockHeaders(blockHeaderOrder);
          setBlockData(block_table_data);
          console.log('block_table_data[0]):', block_table_data[0]);
          console.log('block_table_data):', block_table_data);
          
          // Filter data for rcpId "rcp_exp_250818_1"
          const dataArray = Object.values(block_table_data);
          const filtered = dataArray.filter(item => item.rcp_id === "rcp_sim_250818_108");
          console.log('block_table_data filtered:', filtered);


        }
        // console.log('processedData_gen:', processedData_gen);
        console.log('Successfully loaded initial data:', block_table_data);
      }



    } catch (error) {
      console.error('Failed to load initial data:', error);
    }

    };
    
    fetchJsonData();
  }, []);

  // 선택한 block_id에 따라 blockData 필터링
    const filteredBlockData = blockData.filter(
    item =>
      item.rcp_id === "rcp_sim_250818_108" &&
      item.block_id === selectedBlockId
  );
// 매핑 객체
    const genHeaderDisplayNames = {
      block_no: "Block No",
      block_type: "Block Type",
      module_no: "Module No",
      ord_seq_no: "Order Seq No",
      rcp_id: "Recipe ID",
      reference_id: "Reference ID",
      wo_id: "Work Order ID"
    };

    const blockHeaderDisplayNames = {
      block_type: "Block Type",
      ord_seq_no_2: "Order Seq No2",
      hub_voc_id: "Hub Vocabulary ID",
      eco_voc_id: "Eco Vocabulary ID",
      voc_level_1: "Vocabulary Lv1",
      voc_level_2: "Vocabulary Lv2",
      voc_name: "Vocabulary Name",
      voc_value: "Vocabulary Value"
    };

  return (
    <div className="json-display-container" style={{ padding: '20px', overflowX: 'auto' }}>
      
    <div className='gen-text-header'>
        <h3>General Data Table</h3>
      </div>
      <div className="general-display-container" style={{ padding: '20px', overflowX: 'auto' }}>
    
        
        {genData.length > 0 ? (
        <table style={{ 
          borderCollapse: 'collapse', 
          width: '100%', 
          fontSize: '12px',         // 글씨 크기 조정
          textAlign: 'center'        // 글씨 가운데 정렬
        }}>
          <thead>
            <tr>
              {genHeaders.map((header) => (
                <th 
                  key={header} 
                  style={{ 
                    border: '1px solid #ccc', 
                    padding: '8px', 
                    backgroundColor: '#f5f5f5',
                    textAlign: 'center'       // 헤더도 가운데 정렬
                  }}
                >
                  {genHeaderDisplayNames[header] ?? header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {genData.map((row, index) => (
              <tr key={index}>
                {genHeaders.map((header) => (
                  <td 
                    key={header} 
                    style={{ 
                      border: '1px solid #ccc', 
                      padding: '8px',
                      textAlign: 'center'      // 본문도 가운데 정렬
                    }}
                  >
                    {row[header] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
)}
        
      </div>

         <div className='block-text-header'>
  <h3>
    {filteredBlockData.length > 0 
      ? `Block #${filteredBlockData[0].block_no} Data Table` 
      : 'Block Data Table'}
  </h3>
</div>

<div className="block-display-container" style={{ padding: '20px', overflowX: 'auto' }}>
  {filteredBlockData.length > 0 ? (
    <table style={{ 
      borderCollapse: 'collapse', 
      width: '100%', 
      fontSize: '12px',
      textAlign: 'center'
    }}>
      <thead>
        <tr>
          {blockHeaders.map((header) => (
            <th 
              key={header} 
              style={{ 
                border: '1px solid #ccc', 
                padding: '8px', 
                backgroundColor: '#f5f5f5',
                textAlign: 'center'
              }}
            >
              {/* 매핑된 이름 있으면 표시, 없으면 원래 키 사용 */}
              {blockHeaderDisplayNames[header] || header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredBlockData.map((row, index) => (
          <tr key={index}>
            {blockHeaders.map((header) => (
              <td 
                key={header} 
                style={{ 
                  border: '1px solid #ccc', 
                  padding: '8px',
                  textAlign: 'center'
                }}
              >
                {row[header] ?? ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Loading...</p>
  )}
</div>

    </div>
  );
};

export default JSONDisplay;