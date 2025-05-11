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

  useEffect(() => {
    const fetchNodesData = async () => {
      try {
        const response = await fetch('/InitialNodePositionFixed.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData = await response.json();
        const processedData = generateNodesAndEdges(rawData);
        setInitialData(processedData);
      } catch (error) {
        console.error('Failed to load nodes data:', error);
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
  
    const sortedData = [...data].sort((a, b) => a.seq_no - b.seq_no);
  
    let idCounter = 1;
    const idMap = new Map();
  
    const addNode = (item, position, isHorizontal = false) => {
      const nodeType = typeMapping[item.block_type] || 'default';
      const bullets = item.condition_info2 ? [item.condition_info2.replace(/[{}]/g, '').trim()] : [];
      const nodeId = idCounter.toString();
      idMap.set(item.seq_no, nodeId);
      
      const nodeStyle = nodeStyles[nodeType]?.style ?? nodeStyles.default.style;
      
      const node = {
        id: nodeId,
        type: nodeType,
        data: { label: nodeType, bullets },
        position,
        style: nodeStyle,
      };
      
      if (isHorizontal) {
        // For horizontal connections
        node.sourcePosition = Position.Right;
        node.targetPosition = Position.Left;
      } else {
        // For vertical connections (default)
        node.sourcePosition = Position.Bottom;
        node.targetPosition = Position.Top;
      }
      
      nodes.push(node);
      idCounter++;
      return nodeId;
    };
  
    const materialNodes = sortedData.filter(d => d.block_type === 'M');
    const topMaterials = materialNodes.slice(0, 5);
    const sideMaterials = materialNodes.slice(5, 7);
  
    const allOtherNodes = sortedData.filter(d => d.block_type !== 'M');
  
    let yOffset = 0;
    const materialTopIds = topMaterials.map((m, i) => addNode(m, { x: i * 200 - 75, y: yOffset }));
    yOffset += 150;
  
    const processId = addNode(allOtherNodes[0], { x: 300, y: yOffset });
  
    materialTopIds.forEach((mid) => {
      edges.push({
        id: `e${mid}-${processId}`,
        source: mid,
        target: processId,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#222' },
        style: { strokeWidth: 2 },
        sourceHandle: `${mid}-source-bottom`,
        targetHandle: `${processId}-target-top`,
      });
    });
  
    let prevId = processId;
    let currentX = 300;
    yOffset += 150;
    for (let i = 1; i < allOtherNodes.length; i++) {
      const nodeData = allOtherNodes[i];
  
      const nodeId = addNode(nodeData, { x: currentX, y: yOffset });
      edges.push({
        id: `e${prevId}-${nodeId}`,
        source: prevId,
        target: nodeId,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#222' },
        style: { strokeWidth: 2 },
        sourceHandle: `${prevId}-source-bottom`,
        targetHandle: `${nodeId}-target-top`,
      });
      
      // Handle special case for seq_no 8 (branch node)
      if (nodeData.seq_no === 8) {
        sideMaterials.forEach((sm, j) => {
          const mId = addNode(sm, { x: currentX + 300 , y: yOffset + j * 150 -75}, true); // true means horizontal
          
          edges.push({
            id: `e${nodeId}-${mId}`,
            source: nodeId,
            target: mId,
            type: 'smoothstep',
            markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#222' },
            style: { strokeWidth: 2 },
            sourceHandle: `${nodeId}-source-right`,
            targetHandle: `${mId}-target-left`,
          });
        });
      }
  
      prevId = nodeId;
      yOffset += 150;
    }
  
    const productNode = sortedData.find(d => d.seq_no === 22);
    if (productNode) {
      const productId = addNode(productNode, { x: currentX, y: yOffset });
      edges.push({
        id: `e${prevId}-${productId}`,
        source: prevId,
        target: productId,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#222' },
        style: { strokeWidth: 2 },
        sourceHandle: `${prevId}-source-bottom`,
        targetHandle: `${productId}-target-top`,
      });
  
      const analysis = sortedData.find(d => d.block_type === 'A');
      const results = sortedData.filter(d => d.block_type === 'R');
      
      const analysisId = addNode(analysis, { x: currentX + 300, y: yOffset }, true); // horizontal
      
      edges.push({
        id: `e${productId}-${analysisId}`,
        source: productId,
        target: analysisId,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#222' },
        style: { strokeWidth: 2 },
        sourceHandle: `${productId}-source-right`,
        targetHandle: `${analysisId}-target-left`,
      });
  
      results.forEach((r, i) => {
        const rId = addNode(r, { x: currentX + 600, y: yOffset +i * 150}, true); // horizontal
        
        edges.push({
          id: `e${analysisId}-${rId}`,
          source: analysisId,
          target: rId,
          type: 'smoothstep',
          markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#222' },
          style: { strokeWidth: 2 },
          sourceHandle: `${analysisId}-source-right`,
          targetHandle: `${rId}-target-left`,
        });
      });
    }
  
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

  const onNodeClick = useCallback((event, node) => {
    event.stopPropagation();
    const viewport = getViewport();
    setSelectedNode({
      id: node.id,
      data: node.data,
      position: {
        x: node.position.x * viewport.zoom + viewport.x,
        y: node.position.y * viewport.zoom + viewport.y,
      },
    });
  }, [getViewport]);

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
            <ul style={{ marginTop: '6px', paddingLeft: '20px' }}>
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