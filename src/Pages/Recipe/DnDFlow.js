import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from 'reactflow';
import nodeStyles from './nodeStyle';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import { useDnD } from './DnDContext';

const defaultViewport = { x: 0, y: 0, zoom: 0.5 };

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const { type } = useDnD();

  const [initialData, setInitialData] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    const fetchNodesData = async () => {
      try {
        const response = await fetch('InitialNodes.json');
        // 응답 상태 확인
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInitialData(data);  // 데이터 설정
      } catch (error) {
        console.error('Failed to load nodes data:', error);  // 에러 확인
      }
    };
  
    fetchNodesData();
  }, []);

  useEffect(() => {
    if (initialData.nodes.length > 0) {
      // JSON 파일 로딩 후 초기화된 노드 데이터 적용
      const updatedNodes = initialData.nodes.map((node) => {
        const nodeType = node.type;
        const nodeStyle = nodeStyles[nodeType] || nodeStyles.default;

        return {
          ...node,
          style: nodeStyle.style, 
          sourcePosition: nodeStyle.sourcePosition,
          targetPosition: nodeStyle.targetPosition,
        };
      });

      setNodes(updatedNodes);
      setEdges(initialData.edges);  // 엣지 정보도 설정
    }
  }, [initialData, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: nodeStyles[type]?.label },
        style: nodeStyles[type]?.style ?? nodeStyles.default.style,
        sourcePosition: nodeStyles[type]?.sourcePosition,
        targetPosition: nodeStyles[type]?.targetPosition,
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

  return (
    <div className="dndflow">
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          defaultViewport={defaultViewport}
          minZoom={0.2}
          style={{ backgroundColor: '#F7F9FB', height: '100vh', width: '100%' }}
          maxZoom={4}
          fitView
          fitViewOptions={{ padding: 1 }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DnDFlow;
