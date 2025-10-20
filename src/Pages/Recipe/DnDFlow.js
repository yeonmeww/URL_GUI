import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  MarkerType,
  Position,
} from 'reactflow';
import nodeStyles from './nodeStyle';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import { useDnD } from './DnDContext';
import CustomNode from './CustomNode';
import axios from 'axios';


const nodeTypes = {
  custom: CustomNode,
  Material: CustomNode,
  Product: CustomNode,
  Process: CustomNode,
  Simulation: CustomNode,
  Analysis: CustomNode,
  Result: CustomNode,
  default: CustomNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 0.5 };

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const { project } = useReactFlow();

  const { type } = useDnD();

  const [initialData, setInitialData] = useState({ nodes: [], edges: [] });
  const [selectedNode, setSelectedNode] = useState(null);

  // Initial Table Data State
  const [initialTableData, setInitialTableData] = useState([]);
  const [initialTableHeaders, setInitialTableHeaders] = useState([]);

  // General Table Data State
  const [generalTableData, setGeneralTableData] = useState([]);
  const [generalTableHeaders, setGeneralTableHeaders] = useState([]);


  useEffect(() => {
    const fetchNodesData = async () => {
      // try {
      //   const response = await fetch('/InitialNodePositionFixed.json');
      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }
      //   const rawData = await response.json();
      //   const processedData = generateNodesAndEdges(rawData);
      //   setInitialData(processedData);
      // } catch (error) {
      //   console.error('Failed to load nodes data:', error);
      // }

    // try {
    //   const response_coll = await axios.get('http://13.125.96.124:8080/api/v1/recipeInfoCollected');
    //   const coll_data = response_coll.data;
    //   if (Array.isArray(coll_data)) {
    //     setInitialTableData(coll_data);
    //     if (coll_data.length > 0) {
    //       setInitialTableHeaders(Object.keys(coll_data[0]));
    //       console.log('coll_data[0]):', coll_data[0]);
    //       console.log('coll_data):', coll_data);
          
    //       // Filter data for rcpId "rcp_sim_250818_108"
    //       const dataArray = Object.values(coll_data);
    //       const filtered = dataArray.filter(item => item.Recipe_ID === "rcp_sim_250818_108");
    //       console.log('coll_data filtered:', filtered);

    //       const processedData_coll = generateNodesAndEdges(coll_data);
    //       setInitialData(processedData_coll);
    //       console.log('hi');
          
    //     }
    //     // console.log('processedData_coll:', processedData_coll);
    //     console.log('Successfully loaded initial data:', coll_data);

    //   }
    // } catch (error) {
    //   console.error('Failed to load initial data:', error);
    // }
 
    try {
      const response_gen = await axios.get('http://13.125.96.124:8080/api/v1/recipeInfoGeneral');
      const gen_data = response_gen.data;
      if (Array.isArray(gen_data)) {
        setInitialTableData(gen_data);
        if (gen_data.length > 0) {
          setInitialTableHeaders(Object.keys(gen_data[0]));

          console.log('dndflow_gen_data[0]):', gen_data[0]);
          console.log('dndflow_gen_data):', gen_data);
          
          // Filter data for rcpId "rcp_sim_250818_108"
          const dataArray = Object.values(gen_data);
          const filtered = dataArray.filter(item => item.Recipe_ID === "rcp_sim_250818_108");
          console.log('gen_data filtered:', filtered);

          const processedData_gen = generateNodesAndEdges(filtered);
          console.log('hi1111111111111111');
          setInitialData(processedData_gen);
          console.log('hi2222222222222222');

        }
        // console.log('processedData_gen:', processedData_gen);
        console.log('Successfully loaded initial data:', gen_data);
      }
    } catch (error) {
      console.error('Failed to load initial data:', error);
    }


    };
    fetchNodesData();
  }, []);

  useEffect(() => {
    if (initialData.nodes.length > 0) {
      setNodes(initialData.nodes);
      setEdges(initialData.edges);
    }
  }, [initialData, setNodes, setEdges]);





// const generateNodesAndEdges = (data) => {
//   const nodes = [];
//   const edges = [];

//   const typeMapping = {
//     M: 'Material',
//     P: 'Process',
//     A: 'Analysis',
//     R: 'Result',
//     S: 'Simulation',
//     PR: 'Product',
//   };

//   const handleMap = {
//     3: 'right',
//     6: 'bottom',
//     9: 'left',
//     12: 'top',
//   };

//   const blockMap = {};
//   data.forEach((item) => {
//     blockMap[item.Block_ID] = item;
//   });

//   const graph = {};
//   data.forEach((item) => {
//     if (item.Block_Connection_Info && item.Block_Connection_Info.trim() !== '') {
//       const regex = /Block_(\d+),\s*(\d+)/g;
//       const matches = [...item.Block_Connection_Info.matchAll(regex)];
//       // if (matches.length === 2) {
//       //   const src = `Block_${matches[0][1]}`;
//       //   const tgt = `Block_${matches[1][1]}`;
//       //   if (!graph[src]) graph[src] = [];
//       //   graph[src].push(tgt);
//       // }
//       matches.forEach((match, idx) => {
//       const src = `Block_${match[1]}`;
//       const tgt = `Block_${matches[idx + 1] ? matches[idx + 1][1] : match[1]}`;
//       if (!graph[src]) graph[src] = [];
//       if (tgt !== src) graph[src].push(tgt);
//     });

//     }
//   });

//   const visited = new Set();
//   const usedY = new Set(); // 이미 사용된 y 좌표 추적
//   const startNode = data.find((d) => !d.Block_Connection_Info || d.Block_Connection_Info.trim() === '');
//   let xGap = 250;
//   let yGap = 150;

//  const getNextY = (y) => {
//   while (usedY.has(y)) {
//     y += yGap; // 이미 사용된 y이면 아래로 이동
//   }
//   usedY.add(y);
//   return y;
// };

// const assignPosition = (Block_ID, x, y) => {
//   if (visited.has(Block_ID)) return;
//   visited.add(Block_ID);

//   const item = blockMap[Block_ID];
//   const nodeType = typeMapping[item.Block_Type] || 'default';

//   y = getNextY(y); // y 좌표 충돌 체크

//   nodes.push({
//     id: Block_ID,
//     type: nodeType,
//     data: { label: nodeType, bullets: [] },
//     position: { x, y },
//     style: nodeStyles[nodeType]?.style ?? nodeStyles.default.style,
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left,
//   });

//   const children = graph[Block_ID] || [];
//   console.log('Block_ID:', Block_ID, 'children:', children);
//   if (children.length === 1) {
//     // 단일 자식 → 같은 y 유지
//     assignPosition(children[0], x + xGap, y);
//   } else if (children.length > 1) {
//     // 여러 자식 → 겹치지 않도록 y 나눠서 배치
//     let startY = y - ((children.length - 1) * yGap) / 2; // 중앙 기준 배치
//     children.forEach((child, idx) => {
//       console.log('child:', child, 'idx:', idx, 'startY:', startY + idx * yGap);
//       assignPosition(child, x + xGap, startY + idx * yGap);
//     });
//   }
// };

//   if (startNode) {
//     assignPosition(startNode.Block_ID, 100, 100);
//   }

//   // edge 생성
//   data.forEach((item) => {
//     if (item.Block_Connection_Info && item.Block_Connection_Info.trim() !== '') {
//       const regex = /Block_(\d+),\s*(\d+)/g;
//       const matches = [...item.Block_Connection_Info.matchAll(regex)];
//       if (matches.length === 2) {
//         const [srcBlock, srcHandle] = [matches[0][1], matches[0][2]];
//         const [tgtBlock, tgtHandle] = [matches[1][1], matches[1][2]];
//         edges.push({
//           id: `e${srcBlock}-${tgtBlock}`,
//           source: `Block_${srcBlock}`,
//           target: `Block_${tgtBlock}`,
//           type: 'smoothstep',
//           markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#222' },
//           style: { strokeWidth: 2 },
//           sourceHandle: `Block_${srcBlock}-source-${handleMap[srcHandle]}`,
//           targetHandle: `Block_${tgtBlock}-target-${handleMap[tgtHandle]}`,
//         });
//       }
//     }
//   });

//   return { nodes, edges };
// };



const generateNodesAndEdges = (data) => {
  const nodes = [];
  const edges = [];

  const typeMapping = {
    M: 'Material',
    P: 'Process',
    A: 'Analysis',
    R: 'Result',
    S: 'Simulation',
    PR: 'Product',
  };

  const handleMap = {
    3: 'right',
    6: 'bottom',
    9: 'left',
    12: 'top',
  };

  const blockMap = {};
  data.forEach((item) => {
    blockMap[item.Block_ID] = item;
  });

  const graph = {};
  data.forEach((item) => {
    if (item.Block_Connection_Info && item.Block_Connection_Info.trim() !== '') {
      const regex = /Block_(\d+),\s*(\d+)/g;
      const matches = [...item.Block_Connection_Info.matchAll(regex)];
      if (matches.length === 2) {
        const [srcBlock, srcHandle] = [matches[0][1], matches[0][2]];
        const [tgtBlock, tgtHandle] = [matches[1][1], matches[1][2]];

        if (!graph[`Block_${srcBlock}`]) graph[`Block_${srcBlock}`] = [];
        graph[`Block_${srcBlock}`].push(`Block_${tgtBlock}`);
      }
    }
  });

  const xGap = 250;
  const yGap = 120;

  // 1) DFS로 레벨 계산
  const levels = {};
  const dfsDepth = (id, depth) => {
    levels[id] = Math.max(levels[id] ?? 0, depth);
    (graph[id] || []).forEach((child) => dfsDepth(child, depth + 1));
  };
  const startNode = data.find((d) => !d.Block_Connection_Info || d.Block_Connection_Info.trim() === '');
  if (startNode) dfsDepth(startNode.Block_ID, 0);

  // 2) 같은 레벨에 있는 leaf 배치
  const levelGroups = {};
  Object.entries(levels).forEach(([id, lvl]) => {
    if (!levelGroups[lvl]) levelGroups[lvl] = [];
    levelGroups[lvl].push(id);
  });

  const positions = {};
  let currentY = 100;
  Object.keys(levelGroups)
    .sort((a, b) => b - a)
    .forEach((lvl) => {
      levelGroups[lvl].forEach((id, idx) => {
        positions[id] = { x: lvl * xGap + 100, y: currentY + idx * yGap };
      });
    });

  // 3) 부모는 자식들의 평균 위치
  const adjustParent = (id) => {
    const children = graph[id] || [];
    if (children.length > 0) {
      children.forEach((c) => adjustParent(c));
      const childYs = children.map((c) => positions[c].y);
      const avgY = childYs.reduce((a, b) => a + b, 0) / childYs.length;
      positions[id].y = avgY; // 자식 중앙
    }
  };
  if (startNode) adjustParent(startNode.Block_ID);

  // 4) node 생성
  Object.entries(positions).forEach(([id, pos]) => {
    const item = blockMap[id];
    const nodeType = typeMapping[item.Block_Type] || 'default';

    // Reference_Name 가져오기
    const referenceName = item.Reference_Name || item.Reference_Name || '(no reference)';

    nodes.push({
      id,
      type: nodeType,
      data: { label: nodeType, bullets: [referenceName]},
      position: pos,
      style: nodeStyles[nodeType]?.style ?? nodeStyles.default.style,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    });
  });

  // 5) edge 생성 (기존 handleMap 방식 사용)
  data.forEach((item) => {
    if (item.Block_Connection_Info && item.Block_Connection_Info.trim() !== '') {
      const regex = /Block_(\d+),\s*(\d+)/g;
      const matches = [...item.Block_Connection_Info.matchAll(regex)];
      if (matches.length === 2) {
        const [srcBlock, srcHandle] = [matches[0][1], matches[0][2]];
        const [tgtBlock, tgtHandle] = [matches[1][1], matches[1][2]];
        edges.push({
          id: `e${srcBlock}-${tgtBlock}`,
          source: `Block_${srcBlock}`,
          target: `Block_${tgtBlock}`,
          type: 'smoothstep',
          markerEnd: { type: MarkerType.ArrowClosed, width: 15, height: 15, color: '#222' },
          style: { strokeWidth: 2 },
          sourceHandle: `Block_${srcBlock}-source-${handleMap[srcHandle]}`,
          targetHandle: `Block_${tgtBlock}-target-${handleMap[tgtHandle]}`,
        });
      }
    }
  });

  return { nodes, edges };
};



  const onConnect = useCallback(
    (params) => {
      // Create a default connection
      const newEdge = {
        ...params,
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#222',
        },
        style: { strokeWidth: 2 },
        sourceHandle: `${params.source}-source-bottom`,
        targetHandle: `${params.target}-target-top`,
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
    },
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) return;

      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: nodeStyles[type]?.label },
        style: nodeStyles[type]?.style ?? nodeStyles.default.style,
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };

      const node = document.getElementById(newNode.id);
      const nodeRect = node ? node.getBoundingClientRect() : { width: 150, height: 50 };
      const adjustedPosition = {
        x: position.x - nodeRect.width / 2,
        y: position.y - nodeRect.height / 2,
      };

      newNode.position = adjustedPosition;
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const { getViewport } = useReactFlow();
  const { setSelectedBlockId } = useDnD();

  // const onNodeClick = useCallback((event, node) => {
  //   event.stopPropagation();
  //   const viewport = getViewport();
  //   setSelectedNode({
  //     id: node.id,
  //     data: node.data,
  //     position: {
  //       x: node.position.x * viewport.zoom + viewport.x,
  //       y: node.position.y * viewport.zoom + viewport.y,
  //     },
  //   });
  // }, [getViewport]);

  const onNodeClick = useCallback((event, node) => {
  event.stopPropagation();
  const viewport = getViewport();
  console.log("node.idnode.idnode.idnode.id", node.id)
  setSelectedBlockId(node.id); // Block_ID 저장

  setSelectedNode({
    id: node.id,
    data: node.data,
    position: {
      x: node.position.x * viewport.zoom + viewport.x,
      y: node.position.y * viewport.zoom + viewport.y,
    },
  });
}, [getViewport, setSelectedBlockId]);

  const onEdgeClick = useCallback((event, edge) => {
    console.log('🟥 Edge clicked:', edge);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setSelectedNode(null);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="dndflow" style={{ position: 'relative' }}>
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          defaultViewport={defaultViewport}
          minZoom={0.1}
          maxZoom={4}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          style={{ backgroundColor: '#F7F9FB', height: '100vh', width: '100%' }}
          connectionLineComponent={(props) => (
            <g>
              <path
                {...props}
                fill="none"
                stroke="#222"
                strokeWidth={1.5}
                className="animated"
              />
              <circle cx={props.toX} cy={props.toY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
            </g>
          )}
        >
          <Controls />
          <Background />
        </ReactFlow>

        {selectedNode && (
          <div
            style={{
              position: 'absolute',
              top: selectedNode.position.y,
              left: selectedNode.position.x,
              transform: 'translate(0, -100%)',
              background: '#ffffff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 1000,
              fontSize: '14px',
              minWidth: '180px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <strong>{selectedNode.data.label}</strong>
           <ul
            style={{
              marginTop: '6px',
              paddingLeft: '20px',
              fontSize: '18px',      
              lineHeight: '1.8',
              fontWeight: '500',
            }}
          >
            {selectedNode.data.bullets?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          </div>
        )}
      </div>
    </div>
  );
};

export default DnDFlow;