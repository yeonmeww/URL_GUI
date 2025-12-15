
import React, { useEffect, useState } from 'react';
import { useDnD } from './DnDContext';
import axios from 'axios';


const JSONDisplay = ({ recipeIndex }) => {
//   const recipeId = `rcp_exp_251121_${recipeIndex}`;
    const recipeDateMap = {
    1: '251118',
    };

    const getRecipeId = (recipeIndex) => {
    const date = recipeDateMap[recipeIndex] ?? '251121';
    return `rcp_exp_${date}_${recipeIndex}`;
    };
    const recipeId = getRecipeId(recipeIndex);

  const [loading, setLoading] = useState(false);

  const [genData, setGenData] = useState([]);
  const [blockData, setBlockData] = useState([]);

  const [genHeaders, setGenHeaders] = useState([]);
  const [blockHeaders, setBlockHeaders] = useState([]);

  const { selectedBlockId, setSelectedBlockId } = useDnD();
useEffect(() => {
  // 레시피 변경 시 선택된 블록 완전 초기화
  setSelectedBlockId(null);
}, [recipeId, setSelectedBlockId]);


    useEffect(() => {
        if (!recipeIndex) return;
        const fetchJsonData = async () => {
            setLoading(true);
            try {
<<<<<<< Updated upstream
                const response_gen_tab = await axios.get('http://13.125.96.124:8080/api/v1/recipeInfoGeneral');
                const gen_table_data = response_gen_tab.data;
                if (Array.isArray(gen_table_data)) {

                    if (gen_table_data.length > 0) {

                        // 1. 첫 번째 항목 기준으로 !!!자동으로 !!!!!!!!! 헤더 추출
                        // setHeaders(Object.keys(gen_table_data[0])); // 첫 번째 항목 기준으로 헤더 추출


                        // 2. 원하는 순서대로 헤더 배열 !!수동!! 정의
                        const genHeaderOrder = [
                            // // "block_conn_info",
                            // // "block_id",
                            // "block_no",
                            // "block_type",
                            // // "module_id",
                            // "module_no",
                            // "ord_seq_no",
                            // "rcp_id",
                            // "reference_id",
                            // "wo_id"

                            "Block_Connection_Info",
                            "Block_ID",
                            "Block_Type",
                            "Module_ID",
                            "Order_Sequence_Number",
                            "Recipe_ID",
                            "Reference_ID",
                            "Reference_Name",
                            "Work_Order_ID",
                        ];




                        // setHeaders 호출
                        setGenHeaders(genHeaderOrder);
                        setGenData(gen_table_data);
                        console.log('gen_table_data[0]):', gen_table_data[0]);
                        console.log('gen_table_data):', gen_table_data);

                        // Filter data for rcpId "rcp_exp_251118_1"
                        const dataArray = Object.values(gen_table_data);
                        const filtered = dataArray.filter(item => item.Recipe_ID === "rcp_exp_251118_1");
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
                            "Recipe_ID",
                            "Eco_Vocabulary_ID",
                            "Hub_Vocabulary_ID",
                            "Order_Sequence_Number",
                            "Vocabulary_Level_1",
                            "Vocabulary_Level_2",
                            "Vocabulary_Level_3",
                            "Vocabulary_Name",
                            "Vocabulary_Unit",
                            "Vocabulary_Value"

                        ];


                        // setHeaders 호출
                        setBlockHeaders(blockHeaderOrder);
                        setBlockData(block_table_data);
                        console.log('block_table_data[0]):', block_table_data[0]);
                        console.log('block_table_data):', block_table_data);

                        // Filter data for rcpId "rcp_exp_251118_1"
                        const dataArray = Object.values(block_table_data);
                        const filtered = dataArray.filter(item => item.Recipe_ID === "rcp_exp_251118_1");
                        console.log('block_table_data filtered:', filtered);


                    }
                    // console.log('processedData_gen:', processedData_gen);
                    console.log('Successfully loaded initial data:', block_table_data);
                }



            } catch (error) {
                console.error('Failed to load initial data:', error);
            }
=======
                const requestBodyGeneral = {
                  "wo_id": null,
                  "rcp_id": recipeId,
                  "module_id": null,
                  "block_id": null,
                  "module_no": null,
                  "block_no": null,
                  "block_type": null,
                  "reference_id": null,
                  "ord_seq_no": null,
                  "block_conn_info": null
                };

                const genRes = await axios.post(
                'http://13.125.96.124:8080/api/v1/recipeInfoGeneral/search',
                requestBodyGeneral
                );
                setGenData(Array.isArray(genRes.data) ? genRes.data : []);
                setGenHeaders([
                'Block_Connection_Info',
                'Block_ID',
                'Block_Type',
                'Module_ID',
                'Order_Sequence_Number',
                'Recipe_ID',
                'Reference_ID',
                'Reference_Name',
                'Work_Order_ID',
                ]);
                
      
>>>>>>> Stashed changes

                 /* ---------- Block ---------- */
        const requestBodyCollected = {
          wo_id: null,
          rcp_id: recipeId,
          module_id: null,
          block_id: null,
          hub_voc_id: null,
          module_no: null,
          block_no: null,
          block_type: null,
          reference_id: null,
          ord_seq_no_1: null,
          ord_seq_no_2: null,
          eco_voc_id: null,
          voc_level_1: null,
          voc_level_2: null,
          voc_level_3: null,
          voc_level_4: null,
          voc_name: null,
          voc_value: null,
          voc_unit: null,
        };

        const blockRes = await axios.post(
          'http://13.125.96.124:8080/api/v1/recipeInfoCollected/search',
          requestBodyCollected
        );

        setBlockData(Array.isArray(blockRes.data) ? blockRes.data : []);
        setBlockHeaders([
          'Recipe_ID',
          'Eco_Vocabulary_ID',
          'Hub_Vocabulary_ID',
          'Order_Sequence_Number',
          'Vocabulary_Level_1',
          'Vocabulary_Level_2',
          'Vocabulary_Level_3',
          'Vocabulary_Name',
          'Vocabulary_Unit',
          'Vocabulary_Value',
        ]);
      } catch (e) {
        console.error('Failed to load recipe data:', e);
      } finally {
        setLoading(false);
      }
    };


         fetchJsonData();
  }, [recipeIndex, recipeId]);



    /* ---------- Filtering ---------- */
  const filteredRecipeData = genData
    .filter(item => item.Recipe_ID === recipeId)
    .sort(
      (a, b) =>
        Number(a.Order_Sequence_Number) -
        Number(b.Order_Sequence_Number)
    );

  const filteredBlockData = blockData.filter(
    item =>
      item.Recipe_ID === recipeId &&
      `Block_${item.Block_No}` === selectedBlockId
  );
   
 /* ---------- Display Names ---------- */
  const genHeaderDisplayNames = {
    Block_Connection_Info: 'Block Connection Info',
    Block_ID: 'Block ID',
    Block_Type: 'Block Type',
    Module_ID: 'Module ID',
    Order_Sequence_Number: 'Order Sequence Number',
    Recipe_ID: 'Recipe ID',
    Reference_ID: 'Reference ID',
    Reference_Name: 'Reference Name',
    Work_Order_ID: 'Work Order ID',
  };

  const blockHeaderDisplayNames = {
    Recipe_ID: 'Recipe ID',
    Eco_Vocabulary_ID: 'Eco Vocabulary ID',
    Hub_Vocabulary_ID: 'Hub Vocabulary ID',
    Order_Sequence_Number: 'Order Sequence Number',
    Vocabulary_Level_1: 'Vocabulary Level 1',
    Vocabulary_Level_2: 'Vocabulary Level 2',
    Vocabulary_Level_3: 'Vocabulary Level 3',
    Vocabulary_Name: 'Vocabulary Name',
    Vocabulary_Unit: 'Vocabulary Unit',
    Vocabulary_Value: 'Vocabulary Value',
  };

const genColumnWidths = {
  Block_Connection_Info: '15%',
  Block_ID: '8%',
  Block_Type: '8%',
  Module_ID: '8%',
  Order_Sequence_Number: '8%',
  Recipe_ID: '8%',
  Reference_ID:'8%',
  Reference_Name: '8%',
  Work_Order_ID: '8%',
};

  const columnWidths = {
    Recipe_ID: '15%',
    Eco_Vocabulary_ID: '8%',
    Hub_Vocabulary_ID: '8%',
    Order_Sequence_Number: '7%',
    Vocabulary_Level_1: '10%',
    Vocabulary_Level_2: '10%',
    Vocabulary_Level_3: '10%',
    Vocabulary_Name: '13%',
    Vocabulary_Unit: '5%',
    Vocabulary_Value: '15%',
  };

  /* ---------- Loading ---------- */


    return (
        <div className="json-display-container" style={{ padding: '20px', overflowX: 'auto' }}>

            <div className='gen-text-header'>
                <h3>General Recipe Information</h3>
            </div>
            <div className="general-display-container" style={{ padding: '20px', overflowX: 'auto' }}>


                {filteredRecipeData.length > 0 ? (
                    <table style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        tableLayout: 'fixed',
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
                                    textAlign: 'center',
                                    width: genColumnWidths[header] || '10%',   // 칼럼 비율 지정
                                    wordWrap: 'break-word',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',

                                    }}
                                >
                                    {genHeaderDisplayNames[header] ?? header}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {filteredRecipeData.map((row, index) => (
                            <tr key={index}>
                                {genHeaders.map((header) => (
                                    <td
                                        key={header}
                                        style={{
                                
                                            border: '1px solid #ccc',
                                            padding: '8px',
                                            textAlign: 'center',
                                            width: genColumnWidths[header] || '10%',
                                            wordWrap: 'break-word',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
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
                        ? `Recipe Information - Block #${filteredBlockData[0].Block_No}`
                        : 'Recipe Information'}
                </h3>
            </div>

            <div key={recipeId}  className="block-display-container" style={{ padding: '20px', overflowX: 'auto' }}>
                {filteredBlockData.length > 0 ? (
                    <table
                        style={{
                            borderCollapse: 'collapse',
                            width: '100%',
                            tableLayout: 'fixed',   // 고정된 테이블 레이아웃
                            fontSize: '12px',
                            textAlign: 'center',
                        }}
                        >
                        <thead>
                            <tr>
                            {blockHeaders.map((header) => (
                                <th
                                key={header}
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '8px',
                                    backgroundColor: '#f5f5f5',
                                    textAlign: 'center',
                                    width: columnWidths[header] || '10%',   // 칼럼 비율 지정
                                    wordWrap: 'break-word',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                >
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
                                    textAlign: 'center',
                                    width: columnWidths[header] || '10%',
                                    wordWrap: 'break-word',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
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