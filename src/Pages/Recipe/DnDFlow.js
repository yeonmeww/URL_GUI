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
          
    //       // Filter data for rcpId "rcp_exp_251118_1"
    //       const dataArray = Object.values(coll_data);
    //       const filtered = dataArray.filter(item => item.Recipe_ID === "rcp_exp_251118_1");
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
          
          // Filter data for rcpId "rcp_exp_251118_1"
          const dataArray = Object.values(gen_data);
          const filtered = dataArray.filter(item => item.Recipe_ID === "rcp_exp_251118_1");
          console.log('gen_data filtered:', filtered);

          const processedData_gen = generateNodesAndEdges(filtered);
          console.log('processedData_gen:', processedData_gen);
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






//배치만 이상한 버전
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

//   // map of items by Block_ID from input data
//   const itemMap = {};
//   data.forEach((it) => {
//     itemMap[it.Block_ID] = it;
//   });

//   // helpers
//   const normalizeBlockId = (raw) => {
//     if (!raw) return null;
//     const m = raw.match(/(\d+)/);
//     return m ? `Block_${m[1]}` : null;
//   };

//   // outMap: sourceID -> [{ target, srcHandle, tgtHandle }]
//   const outMap = {};
//   const inDegree = {};
//   const nodesSet = new Set();

//   // initialize nodesSet & inDegree from provided data
//   data.forEach((it) => {
//     nodesSet.add(it.Block_ID);
//     inDegree[it.Block_ID] = inDegree[it.Block_ID] ?? 0;
//     outMap[it.Block_ID] = outMap[it.Block_ID] ?? [];
//   });

//   // Robust parser:
//   // - split Block_Connection_Info into groups by braces '}' or ';' or '),'
//   // - for each group, extract tokens: block tokens (block_x) and plain numbers
//   // - expect sequence: BLOCK, HANDLE, BLOCK, HANDLE  (may repeat)
//   const groupSplitter = /[{}]+/; // we'll split and examine pieces that contain tokens
//   data.forEach((it) => {
//     const raw = it.Block_Connection_Info || '';
//     if (!raw || typeof raw !== 'string') return;

//     // split into candidate groups by '},{' or '}' etc.
//     // keep segments that contain 'block' or digits
//     const parts = raw.split(/[,]*\s*\}\s*,?\s*\{?/).map((s) => s.trim()).filter(Boolean);

//     parts.forEach((part) => {
//       // find tokens in order: either 'block_123' (any case) or numbers (handles)
//       // token regex returns both block tokens and numbers preserving order
//       const tokenRegex = /([Bb]lock[_\s-]*\d+)|(\d+)/g;
//       const tokens = [];
//       let m;
//       while ((m = tokenRegex.exec(part)) !== null) {
//         if (m[1]) { // block token
//           tokens.push({ type: 'block', raw: m[1] });
//         } else if (m[2]) { // plain number (handle)
//           tokens.push({ type: 'num', raw: m[2] });
//         }
//       }

//       // now walk tokens: expect [block,num,block,num,...]
//       for (let i = 0; i + 3 < tokens.length; i += 4) {
//         // ensure pattern matches block,num,block,num
//         if (tokens[i].type === 'block' && tokens[i+1].type === 'num' &&
//             tokens[i+2].type === 'block' && tokens[i+3].type === 'num') {
//           const src = normalizeBlockId(tokens[i].raw);
//           const srcHandle = tokens[i+1].raw;
//           const tgt = normalizeBlockId(tokens[i+2].raw);
//           const tgtHandle = tokens[i+3].raw;

//           if (!src || !tgt) continue;

//           nodesSet.add(src);
//           nodesSet.add(tgt);
//           outMap[src] = outMap[src] || [];
//           outMap[src].push({ target: tgt, srcHandle, tgtHandle });

//           inDegree[tgt] = (inDegree[tgt] || 0) + 1;
//           inDegree[src] = inDegree[src] ?? 0;
//         }
//       }
//     });
//   });

//   // Kahn's algorithm for topo-sort & depth assignment (robust)
//   const depth = {};
//   const q = [];
//   Array.from(nodesSet).forEach((n) => {
//     if (!inDegree[n] || inDegree[n] === 0) {
//       q.push(n);
//       depth[n] = 0;
//     }
//   });

//   const topo = [];
//   while (q.length) {
//     const cur = q.shift();
//     topo.push(cur);
//     const outs = outMap[cur] || [];
//     outs.forEach((o) => {
//       inDegree[o.target] = (inDegree[o.target] || 1) - 1;
//       if (inDegree[o.target] === 0) {
//         q.push(o.target);
//         depth[o.target] = (depth[cur] ?? 0) + 1;
//       } else {
//         depth[o.target] = Math.max(depth[o.target] ?? 0, (depth[cur] ?? 0) + 1);
//       }
//     });
//   }

//   // if some nodes remain (due to cycles or weird refs), place them deeper
//   const remaining = Array.from(nodesSet).filter((n) => !topo.includes(n));
//   if (remaining.length) {
//     const maxD = Math.max(0, ...Object.values(depth));
//     remaining.forEach((n, i) => {
//       depth[n] = depth[n] ?? maxD + 1 + i;
//       topo.push(n);
//     });
//   }

//   // group by depth
//   const depthGroups = {};
//   Object.keys(depth).forEach((k) => {
//     const d = depth[k];
//     (depthGroups[d] = depthGroups[d] || []).push(k);
//   });

//   // sort nodes inside layer by original Order_Sequence_Number if available
//   Object.keys(depthGroups).forEach((d) => {
//     depthGroups[d].sort((a, b) => {
//       const ai = itemMap[a]?.Order_Sequence_Number ?? Number(a.replace('Block_', '')) ?? 0;
//       const bi = itemMap[b]?.Order_Sequence_Number ?? Number(b.replace('Block_', '')) ?? 0;
//       return ai - bi;
//     });
//   });

//   // initial positions (grid-like)
//   const positions = {};
//   const xGap = 180;
//   const yGap = 150;
//   const left = 80;
//   Object.keys(depthGroups).map(Number).sort((a,b)=>a-b).forEach((d) => {
//     let curX = left;
//     depthGroups[d].forEach((nid) => {
//       positions[nid] = { x: curX, y: d * yGap + 60 };
//       curX += xGap;
//     });
//   });

//   // parents map (for multi-parent centering)
//   const parentsMap = {};
//   Object.keys(outMap).forEach((s) => {
//     (outMap[s] || []).forEach((o) => {
//       parentsMap[o.target] = parentsMap[o.target] || new Set();
//       parentsMap[o.target].add(s);
//     });
//   });

//   // center nodes under parents average x (if parents exist and parent positions known)
//   Object.keys(parentsMap).forEach((nid) => {
//     const parents = Array.from(parentsMap[nid]);
//     const xs = parents.map(p => positions[p]?.x).filter(v => typeof v === 'number');
//     if (xs.length) {
//       const avg = xs.reduce((a,b) => a+b,0) / xs.length;
//       if (!positions[nid]) positions[nid] = { x: avg, y: (depth[nid]||0)*yGap + 60 };
//       else positions[nid].x = avg;
//     }
//   });

//   // resolve collisions inside same depth: ensure min gap
//   const minGap = 130;
//   Object.keys(depthGroups).forEach((dKey) => {
//     const list = depthGroups[dKey];
//     list.sort((a,b) => (positions[a].x||0) - (positions[b].x||0));
//     for (let i=1; i<list.length; i++) {
//       const leftId = list[i-1], curId = list[i];
//       if ((positions[curId].x - positions[leftId].x) < minGap) {
//         positions[curId].x = positions[leftId].x + minGap;
//       }
//     }
//   });

//   // finalize nodes: if item not in itemMap, create minimal placeholder
//   Array.from(nodesSet).forEach((nid) => {
//     const item = itemMap[nid];
//     const labelType = item ? (typeMapping[item.Block_Type] || 'default') : 'default';
//     const reference = item?.Reference_Name ?? (item ? '' : '(external reference)');
//     const pos = positions[nid] || { x: 100, y: 100 };

//     nodes.push({
//       id: nid,
//       type: labelType,
//       data: { label: labelType, bullets: reference ? [reference] : [] },
//       position: pos,
//       style: nodeStyles[labelType]?.style ?? nodeStyles.default.style,
//       sourcePosition: Position.Right,
//       targetPosition: Position.Left,
//     });
//   });

//   // build edges (use handleMap if possible)
//   Object.keys(outMap).forEach((src) => {
//     (outMap[src]||[]).forEach((o, idx) => {
//       const srcH = handleMap[o.srcHandle] ?? 'right';
//       const tgtH = handleMap[o.tgtHandle] ?? 'left';
//       edges.push({
//         id: `e-${src}-${o.target}-${idx}`,
//         source: src,
//         target: o.target,
//         type: 'smoothstep',
//         markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14, color: '#222' },
//         style: { strokeWidth: 2 },
//         sourceHandle: `${src}-source-${srcH}`,
//         targetHandle: `${o.target}-target-${tgtH}`,
//       });
//     });
//   });

//   return { nodes, edges };
// };

//30 하단만 잘되는 버전
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
//   data.forEach((item) => (blockMap[item.Block_ID] = item));

//   // ---------------------------------------------------
//   // 1) Block_Connection_Info 파싱하여 adjacency 생성
//   // ---------------------------------------------------
//   const graph = {};
//   const reverseGraph = {};
//   const connectedSet = new Set();

//   data.forEach((item) => {
//     if (!item.Block_Connection_Info || item.Block_Connection_Info.trim() === '') return;
  
//     const info = item.Block_Connection_Info;
//     const regex = /[Bb]lock_(\d+),\s*(\d+)/g;
//     const matches = [...info.matchAll(regex)];
  
//     if (matches.length > 0) {
//       const [srcBlock, srcHandle] = [matches[0][1], matches[0][2]];
//       const [tgtBlock, tgtHandle] = [matches[1][1], matches[1][2]];
  
//       connectedSet.add(`Block_${srcBlock}`);
//       connectedSet.add(`Block_${tgtBlock}`);
  
//       if (!graph[`Block_${srcBlock}`]) graph[`Block_${srcBlock}`] = [];
//       graph[`Block_${srcBlock}`].push({ child: `Block_${tgtBlock}`, handle: srcHandle });
  
//       reverseGraph[`Block_${tgtBlock}`] = `Block_${srcBlock}`;
//     }
//   console.log('graphgraphgraph', graph)
//   });
  

//   // ---------------------------------------------------
//   // 2) 순서 기반 y 배치
//   // ---------------------------------------------------
//   const yGap = 120;
//   const xGap = 260;
//   const sorted = [...data].sort((a, b) => a.Order_Sequence_Number - b.Order_Sequence_Number);

//   const positions = {};

//   sorted.forEach((item, i) => {
//     positions[item.Block_ID] = {
//       x: 0,                 // 기본 메인 트리 x = 0
//       y: 100 + i * yGap,    // 순서대로 아래
//     };
//   });

//   // ---------------------------------------------------
//   // 3) Branch 의 x 배치: parent.x ± xGap
//   // ---------------------------------------------------
//   const visited = new Set();

//   const assignBranchX = (id) => {
//     if (visited.has(id)) return;
//     visited.add(id);
  
//     const children = graph[id] || [];
//     children.forEach(({ child, handle }) => {
//       if (positions[child]) {
//         // y 변화 없음
//         if (handleMap[handle] === 'right') {
//           positions[child].x = positions[id].x + xGap;
//         } else if (handleMap[handle] === 'left') {
//           positions[child].x = positions[id].x - xGap;
//         } else {
//           // top, bottom → y 변화 없음
//           positions[child].y = positions[id].y + yGap;  
//         }
//       }
  
//       assignBranchX(child);
//     });
//   };
  

//   // 루트 노드 찾기 (parent 없는 노드)
//   const mainRoots = sorted.filter((d) => !reverseGraph[d.Block_ID]);
//   mainRoots.forEach((root) => assignBranchX(root.Block_ID));

//   // ---------------------------------------------------
//   // 4) 고립블록 오른쪽으로만 배치
//   // ---------------------------------------------------
//   // const lonelyBlocks = sorted
//   //   .filter((item) => !connectedSet.has(item.Block_ID))
//   //   .map((item) => item.Block_ID);

//   // lonelyBlocks.forEach((id, idx) => {
//   //   positions[id].x = xGap * 2 + idx * xGap; // 오른쪽 방향으로만 증가
//   // });

//   // ---------------------------------------------------
//   // 5) Node 생성
//   // ---------------------------------------------------
//   sorted.forEach((item) => {
//     const nodeType = typeMapping[item.Block_Type] || 'default';
//     const refName = item.Reference_Name || '(no reference)';

//     nodes.push({
//       id: item.Block_ID,
//       type: nodeType,
//       data: { label: nodeType, bullets: [refName] },
//       position: positions[item.Block_ID],
//       sourcePosition: Position.Right,
//       targetPosition: Position.Left,
//       style: nodeStyles[nodeType]?.style ?? nodeStyles.default.style,
//     });
//   });

//   // ---------------------------------------------------
//   // 6) Edge 생성
//   // ---------------------------------------------------
//   data.forEach((item) => {
//     const info = item.Block_Connection_Info;
//     if (!info || info.trim() === '') return;

//     const regex = /[Bb]lock_(\d+),\s*(\d+)/g;
//     const matches = [...info.matchAll(regex)];
//     if (matches.length !== 2) return;

//     const [src, srcH] = [matches[0][1], matches[0][2]];
//     const [tgt, tgtH] = [matches[1][1], matches[1][2]];

//     edges.push({
//       id: `e${src}-${tgt}`,
//       source: `Block_${src}`,
//       target: `Block_${tgt}`,
//       type: 'smoothstep',
//       markerEnd: {
//         type: MarkerType.ArrowClosed,
//         width: 15,
//         height: 15,
//         color: '#222',
//       },
//       style: { strokeWidth: 2 },
//       sourceHandle: `Block_${src}-source-${handleMap[srcH]}`,
//       targetHandle: `Block_${tgt}-target-${handleMap[tgtH]}`,
//     });
//   });

//   return { nodes, edges };
// };


// 부모 자식 다 저장하는버전 -> 걍 세로로 쭉 연결한 버전
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

//   // ----------------------------------------------------------
//   // 0) 불규칙한 Block_Connection_Info robust 파서
//   // ----------------------------------------------------------
//   const parseConnections = (info) => {
//     if (!info || info.trim() === '') return [];

//     // Block / block / BLock / bLOCK
//     // Block_12, 3 , Block 12 3 , Block_12,3), 등 전부 허용
//     const regex = /[Bb]lock[_ ]*(\d+)\s*[, ]\s*(\d+)/g;
//     const matches = [...info.matchAll(regex)];

//     // Block_x, handle → 배열
//     const list = matches.map(m => ({
//       block: `Block_${m[1]}`,
//       handle: m[2],
//     }));

//     if (list.length < 2) return [];

//     // A→B, B→C, C→D... 연속 pair 생성
//     const pairs = [];
//     for (let i = 0; i < list.length - 1; i++) {
//       pairs.push({
//         srcBlock: list[i].block,
//         srcHandle: list[i].handle,
//         tgtBlock: list[i + 1].block,
//         tgtHandle: list[i + 1].handle,
//       });
//     }

//     return pairs;
//   };

//   // ----------------------------------------------------------
//   // 1) blockMap
//   // ----------------------------------------------------------
//   const blockMap = {};
//   data.forEach(d => blockMap[d.Block_ID] = d);

//   // ----------------------------------------------------------
//   // 2) graph = children, reverseGraph = parents
//   // ----------------------------------------------------------
//   const graph = {};         // children
//   const reverseGraph = {};  // parents
//   const connectedSet = new Set();

//   data.forEach(item => {
//     const pairs = parseConnections(item.Block_Connection_Info);
//     if (pairs.length === 0) return;

//     pairs.forEach(({ srcBlock, srcHandle, tgtBlock, tgtHandle }) => {
//       connectedSet.add(srcBlock);
//       connectedSet.add(tgtBlock);

//       if (!graph[srcBlock]) graph[srcBlock] = [];
//       graph[srcBlock].push({
//         child: tgtBlock,
//         handle: srcHandle,
//       });

//       if (!reverseGraph[tgtBlock]) reverseGraph[tgtBlock] = [];
//       reverseGraph[tgtBlock].push({
//         parent: srcBlock,
//         handle: tgtHandle,
//       });
//     });
//   });
//   console.log("graphgraphgraphgraph", graph)
//   // ----------------------------------------------------------
//   // 3) 기본 y 배치 (Order Sequence 기준)
//   // ----------------------------------------------------------
//   const sorted = [...data].sort(
//     (a, b) => a.Order_Sequence_Number - b.Order_Sequence_Number
//   );

//   const positions = {};
//   const yGap = 120;
//   const xGap = 260;

//   sorted.forEach((item, i) => {
//     positions[item.Block_ID] = {
//       x: 0,
//       y: 100 + i * yGap,
//     };
//   });

//   // ----------------------------------------------------------
//   // 4) DFS 배치: parent/child 양쪽 방향
//   // ----------------------------------------------------------
//   const visited = new Set();

//   const dfsLayout = (key) => {
//     if (visited.has(key)) return;
//     visited.add(key);

//     const id = key.replace("Block_", "");

//     // Children (branch outward)
//     const children = graph[key] || [];
//     children.forEach(({ child, handle }) => {
//       const cid = child.replace("Block_", "");
//       if (positions[cid]) {
//         if (handleMap[handle] === "right") {
//           positions[cid].x = positions[id].x + xGap;
//         } else if (handleMap[handle] === "left") {
//           positions[cid].x = positions[id].x - xGap;
//         } else {
//           positions[cid].y = positions[id].y + yGap;
//         }
//       }
//       dfsLayout(child);
//     });

//     // Parents (merge inward)
//     const parents = reverseGraph[key] || [];
//     parents.forEach(({ parent, handle }) => {
//       const pid = parent.replace("Block_", "");
//       if (positions[pid]) {
//         if (handleMap[handle] === "right") {
//           positions[pid].x = positions[id].x + xGap;
//         } else if (handleMap[handle] === "left") {
//           positions[pid].x = positions[id].x - xGap;
//         } else {
//           positions[pid].y = positions[id].y - yGap;
//         }
//       }
//       dfsLayout(parent);
//     });
//   };

//   // 부모가 없는 루트들을 우선적으로 시작
//   const roots = sorted.filter(d => !reverseGraph[`Block_${d.Block_ID}`]);
//   roots.forEach(r => dfsLayout(`Block_${r.Block_ID}`));

//   // ----------------------------------------------------------
//   // 5) nodes 생성
//   // ----------------------------------------------------------
//   sorted.forEach((item) => {
//     const nodeType = typeMapping[item.Block_Type] || "default";

//     nodes.push({
//       id: item.Block_ID,
//       type: nodeType,
//       data: {
//         label: nodeType,
//         bullets: [item.Reference_Name || "(no reference)"],
//       },
//       position: positions[item.Block_ID],
//       sourcePosition: Position.Right,
//       targetPosition: Position.Left,
//       style: nodeStyles[nodeType]?.style ?? nodeStyles.default.style,
//     });
//   });

//   // ----------------------------------------------------------
//   // 6) edges 생성
//   // ----------------------------------------------------------
//   data.forEach((item) => {
//     const pairs = parseConnections(item.Block_Connection_Info);
//     pairs.forEach(({ srcBlock, srcHandle, tgtBlock, tgtHandle }) => {
//       const src = srcBlock.replace("Block_", "");
//       const tgt = tgtBlock.replace("Block_", "");

//       edges.push({
//         id: `e${src}-${tgt}`,
//         source: srcBlock,
//         target: tgtBlock,
//         type: "smoothstep",
//         markerEnd: {
//           type: MarkerType.ArrowClosed,
//           width: 15,
//           height: 15,
//           color: "#222",
//         },
//         style: { strokeWidth: 2 },
//         sourceHandle: `${srcBlock}-source-${handleMap[srcHandle]}`,
//         targetHandle: `${tgtBlock}-target-${handleMap[tgtHandle]}`,
//       });
//     });
//   });

//   return { nodes, edges };
// };


//뉴 알고리즘
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

//   // ----------------------------------------------------------
//   // 0) robust parser
//   // ----------------------------------------------------------
//   const parseConnections = (info) => {
//     if (!info || info.trim() === '') return [];
//     const regex = /[Bb]lock[_ ]*(\d+)\s*[, ]\s*(\d+)/g;
//     const matches = [...info.matchAll(regex)];

//     const list = matches.map(m => ({
//       block: `Block_${m[1]}`,
//       handle: m[2],
//     }));

//     if (list.length < 2) return [];

//     const pairs = [];
//     for (let i = 0; i < list.length - 1; i++) {
//       pairs.push({
//         srcBlock: list[i].block,
//         srcHandle: list[i].handle,
//         tgtBlock: list[i + 1].block,
//         tgtHandle: list[i + 1].handle,
//       });
//     }
//     return pairs;
//   };

//   // ----------------------------------------------------------
//   // 1) blockMap
//   // ----------------------------------------------------------
//   const blockMap = {};
//   data.forEach(d => (blockMap[d.Block_ID] = d));

//   // ----------------------------------------------------------
//   // 2) graph, reverseGraph
//   // ----------------------------------------------------------
//   const graph = {}; // parent → children
//   const reverseGraph = {}; // child → parents

//   data.forEach(item => {
//     const pairs = parseConnections(item.Block_Connection_Info);
//     pairs.forEach(({ srcBlock, srcHandle, tgtBlock, tgtHandle }) => {
//       if (!graph[srcBlock]) graph[srcBlock] = [];
//       graph[srcBlock].push({ child: tgtBlock, handle: srcHandle });

//       if (!reverseGraph[tgtBlock]) reverseGraph[tgtBlock] = [];
//       reverseGraph[tgtBlock].push({ parent: srcBlock, handle: tgtHandle });
//     });
//   });
//   console.log("graphgraphgraphgraph", graph)
//   console.log("reverseGraphreverseGraphreverseGraphreverseGraph", reverseGraph)
//   // ----------------------------------------------------------
//   // 3) 기본 y 배치 (Order Sequence 기준)
//   // ----------------------------------------------------------
//   const sorted = [...data].sort(
//     (a, b) => a.Order_Sequence_Number - b.Order_Sequence_Number
//   );

//   const positions = {};
//   const baseYGap = 120;
//   const baseXGap = 260;

//   sorted.forEach((item, i) => {
//     positions[item.Block_ID] = {
//       x: 0,
//       y: 100 + i * baseYGap,
//     };
//   });

//   // ----------------------------------------------------------
//   // 4) 부모/자식 배치 규칙 적용
//   // ----------------------------------------------------------

//   const visited = new Set();

//   const dfsLayout = (block) => {
//     if (visited.has(block)) return;
//     visited.add(block);

//     const id = block.replace("Block_", "");

//     const parentList = reverseGraph[block] || [];
//     const childList = graph[block] || [];

//     console.log("parentListparentList", parentList)
//     // ---------------------------
//     // (1) 여러 부모가 같은 자식을 가질 때 → 부모들을 가로로 배치
//     // ---------------------------
//     if (parentList.length > 1) {
//       const centerY = positions[id].y;

//       const startX = positions[id].x - ((parentList.length - 1) * baseXGap) / 2;

//       parentList.forEach((p, idx) => {
//         const parent = p.parent.replace("Block_", "");
//         if (positions[parent]) {
//           positions[parent].y = centerY;
//           positions[parent].x = startX + idx * baseXGap;
//         }
//         dfsLayout(p.parent);
//       });
//     }
//     // ---------------------------
//     // (2) 하나의 부모가 여러 자식을 가질 때 → 오른쪽에 세로 배치
//     // ---------------------------
//     if (childList.length > 1) {
//       const baseX = positions[id].x + baseXGap;
//       const baseY = positions[id].y;

//       childList.forEach((c, idx) => {
//         const child = c.child.replace("Block_", "");
//         if (positions[child]) {
//           positions[child].x = baseX;
//           positions[child].y = baseY + idx * baseYGap;
//         }
//         dfsLayout(c.child);
//       });
//     } else {
//       // 기본 규칙 (단일 자식이거나 탐색 중)
//       childList.forEach(c => {
//         const child = c.child.replace("Block_", "");
//         if (positions[child] && positions[id]) {
//           positions[child].x = positions[id].x + baseXGap;
//         }
//         dfsLayout(c.child);
//       });
//     }
//   };

//   // 루트부터 DFS 시작
//   const roots = sorted.filter(d => !reverseGraph[`Block_${d.Block_ID}`]);
//   roots.forEach(r => dfsLayout(`Block_${r.Block_ID}`));

//   // ----------------------------------------------------------
//   // 5) nodes 생성
//   // ----------------------------------------------------------
//   sorted.forEach(item => {
//     const nodeType = typeMapping[item.Block_Type] || "default";

//     nodes.push({
//       id: item.Block_ID,
//       type: nodeType,
//       data: {
//         label: nodeType,
//         bullets: [item.Reference_Name || "(no reference)"],
//       },
//       position: positions[item.Block_ID],
//       sourcePosition: Position.Right,
//       targetPosition: Position.Left,
//       style: nodeStyles[nodeType]?.style ?? nodeStyles.default.style,
//     });
//   });

//  // ----------------------------------------------------------
// // 6) edges 생성
// // ----------------------------------------------------------
// let edgeIdCounter = 0;

// data.forEach(item => {
//   const pairs = parseConnections(item.Block_Connection_Info);
//   pairs.forEach(({ srcBlock, srcHandle, tgtBlock, tgtHandle }) => {

//     edges.push({
//       id: `e-${srcBlock}-${tgtBlock}-${edgeIdCounter++}`,  // 유일한 ID
//       source: srcBlock,
//       target: tgtBlock,
//       type: "smoothstep",
//       markerEnd: {
//         type: MarkerType.ArrowClosed,
//         width: 15,
//         height: 15,
//         color: "#222",
//       },
//       style: { strokeWidth: 2 },
//       sourceHandle: `${srcBlock}-source-${handleMap[srcHandle]}`,
//       targetHandle: `${tgtBlock}-target-${handleMap[tgtHandle]}`,
//     });
//   });
// });

//   return { nodes, edges };
// };




//반자동
const generateNodesAndEdges = (data) => {
  const nodes = [];
  const edges = [];

  const typeMapping = {
    M: "Material",
    P: "Process",
    A: "Analysis",
    R: "Result",
    S: "Simulation",
    PR: "Product",
  };

  const handleMap = { 3: "right", 6: "bottom", 9: "left", 12: "top" };

  // -------------------------------
  // 0) Block_Connection_Info 파싱
  // -------------------------------
  const parseConnections = (info) => {
    if (!info || info.trim() === "") return [];
    const entries = info.match(/\{([^}]+)\}/g);
    if (!entries) return [];
    const pairs = [];
    entries.forEach((raw) => {
      const parts = raw.replace(/[{}]/g, "").split(",").map((s) => s.trim());
      if (parts.length !== 4) return;
      const parent = parts[0].replace(/block_/i, "Block_");
      const parentHandle = parts[1];
      const child = parts[2].replace(/block_/i, "Block_");
      const childHandle = parts[3];
      if (!parent || !child || parent === child) return;
      pairs.push({ srcBlock: parent, srcHandle: parentHandle, tgtBlock: child, tgtHandle: childHandle });
    });
    return pairs;
  };

  // -------------------------------
  // 1) edges 생성
  // -------------------------------
  let edgeIdCounter = 0;
  data.forEach((item) => {
    const pairs = parseConnections(item.Block_Connection_Info);
    pairs.forEach(({ srcBlock, srcHandle, tgtBlock, tgtHandle }) => {
      edges.push({
        id: `e-${srcBlock}-${tgtBlock}-${edgeIdCounter++}`,
        source: srcBlock,
        target: tgtBlock,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed, width: 15, height: 15, color: "#222" },
        style: { strokeWidth: 2 },
        sourceHandle: `${srcBlock}-source-${handleMap[srcHandle] || "top"}`,
        targetHandle: `${tgtBlock}-target-${handleMap[tgtHandle] || "bottom"}`,
      });
    });
  });

  // -------------------------------
  // 2) 행(row) 단위 배치 정의
  // -------------------------------
  const rows = [
    ["Block_1","Block_2","Block_3","Block_4","Block_5","Block_6","Block_7","Block_8","Block_9","Block_10"],
    ["Block_11","Block_12","Block_13","Block_14","Block_15"],
    ["Block_16","Block_17"],
    ["Block_18"],
    ["Block_19"],
    ["Block_20","Block_21", "Block_22"],
    ["Block_23"],
    ["Block_24","Block_25"],
    ["Block_43"],
    ["Block_26"],
    ["Block_27"],
    ["Block_28"],
    ["Block_29"],
    ["Block_30"],
    ["Block_31"],
    ["Block_32"],
    ["Block_33"],
    ["Block_34"],
    ["Block_35","Block_36", "Block_37"],
    ["Block_38"],
    ["Block_39","Block_40"],
    ["Block_41"],
    ["Block_42"]
  ];

  const positions = {};
  const baseXGap = 280;
  const baseYGap = 200;
  let prevRowCenterX = 0;

rows.forEach((row, rowIdx) => {
  let y = 100 + rowIdx * baseYGap;

  // 기본 totalWidth 계산
  const totalWidth = (row.length - 1) * baseXGap;

  // 그룹 1: 가운데 배치 대신 이전 행 중앙 기준
  if(rowIdx === 1) {
    row.forEach((blockId, idx) => {
      const totalWidth = (row.length - 1) * baseXGap * 2;
      const x = prevRowCenterX - totalWidth / 2 + idx * baseXGap * 2;

      positions[blockId] = { x, y };
    });
  }
  else if (
    rowIdx === 5 || // ["Block_20","Block_21","Block_22"]
    rowIdx === 7 ||// ["Block_24","Block_25"]
    rowIdx === 18   
  ) {
    row.forEach((blockId, idx) => {
      const x = prevRowCenterX + idx * baseXGap; // 이전 행 중심 기준 시작
      positions[blockId] = { x, y };
    });
  }
  else if (rowIdx > 18) {
    prevRowCenterX = baseXGap; // 안전 초기화
  
    if (row.length === 1) {
      positions[row[0]] = { x: prevRowCenterX + baseXGap, y: y };
    } 
    else if (row.length >= 2) {
      row.forEach((blockId, idx) => {
        const x = prevRowCenterX + idx * baseXGap; // 이전 행 중심 기준 시작
        positions[blockId] = { x, y };
      });
    }
  }
  
  // 기본 행 가운데 배치
  else {
    row.forEach((blockId, idx) => {
      const x = -totalWidth / 2 + idx * baseXGap;
      positions[blockId] = { x, y };
    });
  }

  // prevRowCenterX 갱신: 안전하게 계산
  const rowXs = row.map(b => positions[b]?.x).filter(x => x !== undefined);
  if (rowXs.length > 0) {
    prevRowCenterX = rowXs.reduce((a, b) => a + b, 0) / rowXs.length;
  }
});
  

  // -------------------------------
  // 3) nodes 생성
  // -------------------------------
  data.forEach((item) => {
    const nodeType = typeMapping[item.Block_Type] || "default";
    nodes.push({
      id: item.Block_ID,
      type: nodeType,
      data: { label: nodeType, bullets: [item.Reference_Name || "(no reference)"] },
      position: positions[item.Block_ID],
      sourcePosition: "bottom",
      targetPosition: "top",
      style: nodeStyles[nodeType]?.style ?? nodeStyles.default.style,
    });
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