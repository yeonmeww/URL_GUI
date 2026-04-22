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
import { useNodesInitialized } from 'reactflow';


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

const DnDFlow = ({ recipeIndex }) => {
  const nodesInitialized = useNodesInitialized();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const {
  screenToFlowPosition,
  project,
  fitView,
  getViewport,
} = useReactFlow();


  const [loading, setLoading] = useState(false);

  const { type } = useDnD();

  const [initialData, setInitialData] = useState({ nodes: [], edges: [] });
  const [selectedNode, setSelectedNode] = useState(null);

  // Initial Table Data State
  const [initialTableData, setInitialTableData] = useState([]);
  const [initialTableHeaders, setInitialTableHeaders] = useState([]);

  // General Table Data State
  const [generalTableData, setGeneralTableData] = useState([]);
  const [generalTableHeaders, setGeneralTableHeaders] = useState([]);

  // const makeRecipeId = (recipeIndex) => {
  //   return `rcp_exp_251121_${recipeIndex}`;
  // };

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
  const recipeLayouts = {
  rcp_sim_251215_935: [
    ["Block_1","Block_2","Block_3","Block_4","Block_5","Block_6","Block_7"],
    ["Block_8","Block_9"],
    ["Block_10"],
    ["Block_11","Block_12"],
    ["Block_13"],
    ["Block_14"],
    ["Block_15"],
  ],

  rcp_exp_251215_1038: [
    ["Block_1","Block_2","Block_3"],
    ["Block_4","Block_5"],
    ["Block_6"],
    ["Block_7","Block_8","Block_9"],
    ["Block_10"],
  ],

  rcp_exp_251215_1043: [
    ["Block_1","Block_2","Block_3","Block_4","Block_5","Block_6","Block_7"],
    ["Block_8"],
    ["Block_9"],
    ["Block_10"],
    ["Block_11"],
    ["Block_12"],
    ["Block_13"],
    ["Block_14","Block_15"],
    ["Block_16"],
    ["Block_17"],
    ["Block_18"],
    ["Block_19"],
    ["Block_20","Block_21"],
    ["Block_22"],
    ["Block_23"],
    ["Block_24"],
    ["Block_25"],
    ["Block_26","Block_27","Block_28"],
    ["Block_29"],
    ["Block_30"],
    ["Block_31"],
    ["Block_32"],
    ["Block_33"],
    ["Block_34"],
    ["Block_35"],
    ["Block_36"],
    ["Block_37"],
    ["Block_38"],
    ["Block_39"],
    ["Block_40"],
    ["Block_41"],
  ],


  rcp_exp_251215_1018: [
    ["Block_1"],
    ["Block_2"],
    ["Block_3"],
    ["Block_4"],
    ["Block_7", "Block_14"],

  ],

  
  rcp_exp_251215_1060: [
    ["Block_1"],
    ["Block_2"],
    ["Block_3"]
  ],
};

const recipeId = getRecipeId(recipeIndex);
const rows = recipeLayouts[recipeId] ?? [];

  useEffect(() => {
  if (!recipeIndex) return;
  const fetchNodesData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/recipeInfoGeneral'
      );

      const gen_data = response.data;
      const recipeId = getRecipeId(recipeIndex);

      if (Array.isArray(gen_data)) {
        const filtered = gen_data.filter(
          item => item.Recipe_ID === recipeId
        );

        const processed = generateNodesAndEdges(filtered, recipeIndex);

        setInitialData(processed);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  fetchNodesData();
}, [recipeIndex]);


  useEffect(() => {
    if (initialData.nodes.length > 0) {
      setNodes(initialData.nodes);
      setEdges(initialData.edges);
    }
  }, [initialData, setNodes, setEdges]);

  useEffect(() => {
  if (!nodesInitialized) return;

  fitView({ padding: 0.1, duration: 300 });
}, [recipeIndex, nodesInitialized, fitView]);




const manualPositionsRecipe4 = {
  // 왼쪽 세로
  Block_1:  { x: 0,   y: 0 },
  Block_2:  { x: 0,   y: 160 },
  Block_3:  { x: 0,   y: 320 },
  Block_4:  { x: 0,   y: 480 },
  Block_7: { x: 0,   y: 640 },
  Block_14: { x: 260, y: 640 },

  // 오른쪽 상단 분기
  Block_5:  { x: 620, y: 0 },
  Block_6:  { x: 880, y: 0 },

  // 중앙 세로
  Block_8:  { x: 750, y: 160 },
  Block_9:  { x: 750, y: 320 },
  Block_10: { x: 750, y: 480 },
  Block_12: { x: 750, y: 640 },

  // 하단 분기
  Block_11: { x: 530, y: 640 },
  Block_13: { x: 1010, y: 640 },
  Block_15: { x: 1010, y: 780 },
  Block_16: { x: 1010, y: 920 },
};


const manualPositionsRecipe3 = {
  // 상단 가로
  Block_1: { x: 0,    y: 0 },
  Block_2: { x: 260,  y: 0 },
  Block_3: { x: 520,  y: 0 },
  Block_4: { x: 780,  y: 0 },
  Block_5: { x: 1040, y: 0 },
  Block_6: { x: 1300, y: 0 },
  Block_7: { x: 1560, y: 0 },

  // 메인 세로
  Block_8:  { x: 780, y: 160 },
  Block_9:  { x: 780, y: 320 },
  Block_10: { x: 780, y: 480 },
  Block_11: { x: 780, y: 640 },
  Block_12: { x: 780, y: 800 },
  Block_13: { x: 780, y: 960 },
  Block_14: { x: 780, y: 1120 },
  Block_15: { x: 780, y: 1280 },
  Block_16: { x: 780, y: 1440 },
  Block_17: { x: 780, y: 1600 },
  Block_18: { x: 780, y: 1760 },
  Block_19: { x: 780, y: 1920 },

  // 우측
  Block_20: { x: 1670, y: 480 },
  Block_21: { x: 1930, y: 480 },
  Block_22: { x: 1800, y: 640 },
  Block_23: { x: 1800, y: 640 },
  Block_24: { x: 1800, y: 800 },

  Block_25: { x: 1800, y: 960 },
  Block_26: { x: 2060, y: 960 },
  Block_27: { x: 2320, y: 960 },

  Block_28: { x: 1800, y: 1120 },
  Block_45: { x: 1800, y: 1280 },


  //
  Block_29: { x: 1170, y: 1440 },
  Block_30: { x: 1430, y: 1440 },
  Block_31: { x: 1300, y: 1600 },
  Block_32: { x: 1300, y: 1760 },
  Block_33: { x: 1300, y: 1920 },
  Block_34: { x: 1300, y: 2080 },

  //
  Block_35: { x: 1040, y: 1920 },
  Block_36: { x: 1040, y: 2080 },
  Block_47: { x: 1040, y: 2240 },

  //
  Block_37: { x: 1170, y: 320 },
  Block_38: { x: 1430, y: 320 },
  Block_39: { x: 1300, y: 480 },
  Block_40: { x: 1300, y: 640 },
  Block_41: { x: 1300, y: 800 },
  Block_42: { x: 1300, y: 960 },
  Block_43: { x: 1040, y: 960 },
  Block_44: { x: 1300, y: 1120 },
  Block_46: { x: 1300, y: 1280 },
};


const generateNodesAndEdges = (blocks, recipeIndex) => {
  const GAP_X = 260;
  const GAP_Y = 160;
  const GROUP_GAP_X = 600;

  /* =========================
   * Parse nodes & edges
   ========================= */
  const nodesMap = {};
  const edges = [];
  let manualPositions = {};

  if (recipeIndex === 3) manualPositions = manualPositionsRecipe3;
  else if (recipeIndex === 4) manualPositions = manualPositionsRecipe4;

  blocks.forEach(b => {
    nodesMap[b.Block_ID] = b;

    if (!b.Block_Connection_Info) return;
    const matches = b.Block_Connection_Info.match(/\{([^}]+)\}/g) || [];

    matches.forEach(raw => {
      const [src, h1, tgt, h2] = raw
        .replace(/[{}]/g, '')
        .split(',')
        .map(v => v.trim().replace(/block_/i, 'Block_'));

      edges.push({
        src,
        tgt,
        srcHandle: Number(h1),
        tgtHandle: Number(h2),
      });
    });
  });

  const nodeIds = Object.keys(nodesMap);

  /* =========================
   * Connected Components
   ========================= */
  const adj = {};
  nodeIds.forEach(id => (adj[id] = new Set()));

  edges.forEach(e => {
    adj[e.src]?.add(e.tgt);
    adj[e.tgt]?.add(e.src);
  });

  const visited = new Set();
  const groups = [];

  nodeIds.forEach(id => {
    if (visited.has(id)) return;
    const stack = [id];
    const group = [];

    while (stack.length) {
      const cur = stack.pop();
      if (visited.has(cur)) continue;
      visited.add(cur);
      group.push(cur);
      adj[cur].forEach(n => stack.push(n));
    }
    groups.push(group);
  });

  /* =========================
   * Auto layout (기존 로직 그대로)
   ========================= */
  const autoPos = {};
  let baseX = 0;

  groups.forEach(group => {
    const localX = {};
    const localY = {};

    const vEdges = edges.filter(
      e =>
        group.includes(e.src) &&
        group.includes(e.tgt) &&
        ((e.srcHandle === 6 && e.tgtHandle === 12) ||
         (e.srcHandle === 12 && e.tgtHandle === 6))
    );

    const vAdj = {};
    group.forEach(id => (vAdj[id] = []));

    vEdges.forEach(e => {
      if (e.srcHandle === 6) vAdj[e.src].push(e.tgt);
      else vAdj[e.tgt].push(e.src);
    });

    const hasParent = new Set(
      vEdges.map(e => (e.srcHandle === 6 ? e.tgt : e.src))
    );

    const roots = group.filter(id => !hasParent.has(id));

    let yCursor = 0;
    roots.forEach(root => {
      const q = [root];
      while (q.length) {
        const cur = q.shift();
        if (localY[cur] !== undefined) continue;
        localY[cur] = yCursor++;
        vAdj[cur].forEach(n => q.push(n));
      }
    });

    const hEdges = edges.filter(
      e =>
        group.includes(e.src) &&
        group.includes(e.tgt) &&
        ((e.srcHandle === 3 && e.tgtHandle === 9) ||
         (e.srcHandle === 9 && e.tgtHandle === 3))
    );

    group.forEach(id => (localX[id] = 0));

    hEdges.forEach(e => {
      if (e.srcHandle === 3) {
        localX[e.tgt] = localX[e.src] + 1;
        localY[e.tgt] = localY[e.src];
      } else {
        localX[e.tgt] = localX[e.src] - 1;
        localY[e.tgt] = localY[e.src];
      }
    });

    group.forEach(id => {
      autoPos[id] = {
        x: baseX + localX[id],
        y: localY[id] ?? 0,
      };
    });

    baseX += GROUP_GAP_X / GAP_X;
  });

  /* =========================
   * px 변환
   ========================= */
  const xs = Object.values(autoPos).map(p => p.x);
  const ys = Object.values(autoPos).map(p => p.y);

  const minX = Math.min(...xs);
  const minY = Math.min(...ys);

  const autoPositions = {};
  Object.entries(autoPos).forEach(([id, p]) => {
    autoPositions[id] = {
      x: (p.x - minX) * GAP_X,
      y: (p.y - minY) * GAP_Y,
    };
  });

 

  /* =========================
   * ReactFlow edges
   ========================= */
  const handleMap = {
    3: ['right', 'left'],
    9: ['left', 'right'],
    6: ['bottom', 'top'],
    12: ['top', 'bottom'],
  };

  const rfEdges = edges.map(e => {
    const h = handleMap[e.srcHandle];
    if (!h) return null;

    return {
      id: `e-${e.src}-${e.tgt}`,
      source: e.src,
      target: e.tgt,
      sourceHandle: `${e.src}-source-${h[0]}`,
      targetHandle: `${e.tgt}-target-${h[1]}`,
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    };
  }).filter(Boolean);

  /* =========================
   * ReactFlow nodes
   ========================= */
  const typeMap = {
    M: 'Material',
    P: 'Process',
    A: 'Analysis',
    R: 'Result',
    S: 'Simulation',
    PR: 'Product',
  };

  const rfNodes = blocks.map(b => ({
    id: b.Block_ID,
    type: typeMap[b.Block_Type] || 'default',
    position:
      manualPositions[b.Block_ID] ??
      autoPositions[b.Block_ID] ??
      { x: 0, y: 0 },

    data: {
      label: typeMap[b.Block_Type],
      bullets: b.Reference_Name ? [b.Reference_Name] : [],

    },
    style: nodeStyles[typeMap[b.Block_Type]]?.style,
  }));

  return { nodes: rfNodes, edges: rfEdges };
};





// const generateNodesAndEdges = (data) => {
//   const GAP_X = 260;
//   const GAP_Y = 160;

//   const typeMap = {
//     M: 'Material',
//     P: 'Process',
//     A: 'Analysis',
//     R: 'Result',
//     S: 'Simulation',
//     PR: 'Product',
//   };

//   const handleDir = {
//     3: { dx: 1, dy: 0, sh: 'right', th: 'left' },   // →
//     9: { dx: -1, dy: 0, sh: 'left', th: 'right' }, // ←
//     6: { dx: 0, dy: 1, sh: 'bottom', th: 'top' },  // ↓
//     12:{ dx: 0, dy: -1, sh: 'top', th: 'bottom' }, // ↑
//   };

//   /* =========================
//    * 1️⃣ Block_ID 숫자 기준 정렬
//    ========================= */
//   const blocks = [...data].sort(
//     (a, b) =>
//       Number(a.Block_ID.split('_')[1]) -
//       Number(b.Block_ID.split('_')[1])
//   );

//   /* =========================
//    * 2️⃣ 연결 정보 파싱
//    ========================= */
//   const parents = {};
//   const children = {};

//   blocks.forEach(b => {
//     parents[b.Block_ID] = [];
//     children[b.Block_ID] = [];
//   });

//   blocks.forEach(b => {
//     if (!b.Block_Connection_Info) return;

//     const matches = b.Block_Connection_Info.match(/\{([^}]+)\}/g) || [];
//     matches.forEach(raw => {
//       const [src, sH, tgt] = raw
//         .replace(/[{}]/g, '')
//         .split(',')
//         .map(v => v.trim().replace(/block_/i, 'Block_'));

//       parents[tgt].push({ src, sH: Number(sH) });
//       children[src].push({ tgt, sH: Number(sH) });
//     });
//   });

//   /* =========================
//    * 3️⃣ 좌표 관리
//    ========================= */
//   const pos = {};
//   const occupied = new Set();

//   const key = (c, r) => `${c},${r}`;
//   const isUsed = (c, r) => occupied.has(key(c, r));
//   const occupy = (c, r) => occupied.add(key(c, r));

//   /* =========================
//    * 4️⃣ 부모 먼저 배치 (세로 체인)
//    ========================= */
//   let currentRow = 0;

//   blocks.forEach(b => {
//     const id = b.Block_ID;
//     if (pos[id]) return;

//     // 부모 없는 노드 → 세로 체인
//     if (parents[id].length === 0) {
//       pos[id] = { col: 0, row: currentRow };
//       occupy(0, currentRow);
//       currentRow += 1;
//     }
//   });

//   /* =========================
//    * 5️⃣ 부모 기준 방향별 자식 배치 (핵심)
//    ========================= */
//   blocks.forEach(b => {
//     const pid = b.Block_ID;
//     const parentPos = pos[pid];
//     if (!parentPos) return;

//     const grouped = {
//       left: [],
//       right: [],
//       top: [],
//       bottom: [],
//     };

//     (children[pid] || []).forEach(({ tgt, sH }) => {
//       if (sH === 3) grouped.right.push(tgt);
//       if (sH === 9) grouped.left.push(tgt);
//       if (sH === 6) grouped.bottom.push(tgt);
//       if (sH === 12) grouped.top.push(tgt);
//     });

//     /* ⬅ 왼쪽 (가로 1:1) */
//     grouped.left.forEach(tgt => {
//       if (pos[tgt]) return;

//       const col = parentPos.col - 1;
//       const row = parentPos.row;

//       pos[tgt] = { col, row };
//       occupy(col, row);
//     });

//     /* ➡ 오른쪽 (세로 스택) */
//     if (grouped.right.length > 0) {
//       const baseCol = parentPos.col + 1;
//       const startRow =
//         parentPos.row - Math.floor((grouped.right.length - 1) / 2);

//       grouped.right.forEach((tgt, i) => {
//         if (pos[tgt]) return;

//         let row = startRow + i;
//         while (isUsed(baseCol, row)) row++;

//         pos[tgt] = { col: baseCol, row };
//         occupy(baseCol, row);
//       });
//     }

//     /* ⬇ 아래 (세로 체인) */
//     grouped.bottom.forEach((tgt, i) => {
//       if (pos[tgt]) return;

//       let row = parentPos.row + 1 + i;
//       while (isUsed(parentPos.col, row)) row++;

//       pos[tgt] = { col: parentPos.col, row };
//       occupy(parentPos.col, row);
//     });

//     /* ⬆ 위 */
//     grouped.top.forEach((tgt, i) => {
//       if (pos[tgt]) return;

//       let row = parentPos.row - 1 - i;
//       while (isUsed(parentPos.col, row)) row--;

//       pos[tgt] = { col: parentPos.col, row };
//       occupy(parentPos.col, row);
//     });
//   });

//   /* =========================
//    * 6️⃣ px 좌표 변환
//    ========================= */
//   const cols = Object.values(pos).map(p => p.col);
//   const rows = Object.values(pos).map(p => p.row);

//   const minCol = Math.min(...cols);
//   const minRow = Math.min(...rows);

//   const positions = {};
//   Object.entries(pos).forEach(([id, p]) => {
//     positions[id] = {
//       x: (p.col - minCol) * GAP_X,
//       y: (p.row - minRow) * GAP_Y,
//     };
//   });

//   /* =========================
//    * 7️⃣ Edge 생성
//    ========================= */
//   const edges = [];
//   Object.entries(parents).forEach(([tgt, plist]) => {
//     plist.forEach(({ src, sH }) => {
//       const dir = handleDir[sH];
//       if (!dir) return;

//       edges.push({
//         id: `e-${src}-${tgt}`,
//         source: src,
//         target: tgt,
//         type: 'smoothstep',
//         sourceHandle: `${src}-source-${dir.sh}`,
//         targetHandle: `${tgt}-target-${dir.th}`,
//         markerEnd: { type: MarkerType.ArrowClosed },
//       });
//     });
//   });

//   /* =========================
//    * 8️⃣ Node 생성
//    ========================= */
//   const nodes = blocks.map(b => {
//     const t = typeMap[b.Block_Type] || 'default';
//     return {
//       id: b.Block_ID,
//       type: t,
//       position: positions[b.Block_ID],
//       data: {
//         label: t,
//         bullets: [b.Reference_Name || '(no reference)'],
//       },
//       style: nodeStyles[t]?.style ?? nodeStyles.default.style,
//     };
//   });

//   return { nodes, edges };
// };






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
      {/* <Sidebar /> */}
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        {loading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 100,
              background: 'rgba(255,255,255,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            로딩중...
          </div>
        )}
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
          // fitView
          // fitViewOptions={{ padding: 0.1 }}
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