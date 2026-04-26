
import React, { useEffect, useState } from 'react';
import { useDnD } from './DnDContext';
import axios from 'axios';
import SearchBox from '../SearchBox';
import './Recipe.css';


const JSONDisplay = ({ recipeIndex }) => {
//   const recipeId = `rcp_exp_251121_${recipeIndex}`;
    const recipeIdMap = {
  1: 'rcp_sim_251215_935',
  2: 'rcp_exp_251215_1038',
  3: 'rcp_exp_251215_1043',
  4: 'rcp_exp_251215_1018',
  5: 'rcp_exp_251215_1060',
};

const getRecipeId = (recipeIndex) => {
  return recipeIdMap[recipeIndex] ?? null;
};

const recipeId = getRecipeId(recipeIndex);
const searchFields = ['Recipe_ID'];


  const [loading, setLoading] = useState(false);

  const [genData, setGenData] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [searchBoxData, setSearchBoxData] = useState({});

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
                'http://localhost:8080/api/v1/recipeInfoGeneral/search',
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
          'http://localhost:8080/api/v1/recipeInfoCollected/search',
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
            <div className="json-display-search-row">
                <SearchBox
                    SearchBoxData={searchBoxData}
                    setSearchBoxData={setSearchBoxData}
                    fields={searchFields}
                    buttonConfig={{
                        showSearch: true,
                        showSave: false,
                        showDelete: false,
                        showDownload: false
                    }}
                />
            </div>

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
