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
  const { type } = useDnD();

  const [initialData, setInitialData] = useState({ nodes: [], edges: [] });
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const fetchNodesData = async () => {
      try {
        const response = await fetch('InitialNodes.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error('Failed to load nodes data:', error);
      }
    };
    fetchNodesData();
  }, []);

  useEffect(() => {
    if (initialData.nodes.length > 0) {
      const updatedNodes = initialData.nodes.map((node) => {
        const nodeType = node.type;
        const nodeStyle = nodeStyles[nodeType] || nodeStyles.default;

        return {
          ...node,
          style: nodeStyle.style,
          sourcePosition: node.sourcePosition ?? 'right',
          targetPosition: node.targetPosition ?? 'left',
        };
      });

      setNodes(updatedNodes);

      const updatedEdges = initialData.edges.map((edge) => ({
        ...edge,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#222',
        },
        style: { strokeWidth: 2 },
      }));

      setEdges(updatedEdges);
    }
  }, [initialData, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'smoothstep',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: '#222',
            },
          },
          eds
        )
      ),
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

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: nodeStyles[type]?.label,
          bullets: ['세부 내용 A', '세부 내용 B'],
        },
        style: nodeStyles[type]?.style ?? nodeStyles.default.style,
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

  const onNodeClick = useCallback((event, node) => {
    event.stopPropagation(); // Prevent event bubbling

    const wrapperRect = reactFlowWrapper.current.getBoundingClientRect();

    const overlayPosition = {
      x: node.position.x * defaultViewport.zoom + wrapperRect.left + 300,
      y: node.position.y * defaultViewport.zoom + wrapperRect.top - 10,
    };

    setSelectedNode({
      id: node.id,
      data: node.data,
      position: overlayPosition,
    });
  }, []);

  const onEdgeClick = useCallback((event, edge) => {
    console.log('🟥 Edge clicked:', edge);
  }, []);

  // Click outside closes node info box
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
          minZoom={0.6}
          maxZoom={4}
          fitView
          fitViewOptions={{ padding: 0.5 }}
          style={{ backgroundColor: '#F7F9FB', height: '100vh', width: '100%' }}
        >
          <Controls />
          <Background />
        </ReactFlow>

        {/* 선택된 노드 정보창 */}
        {selectedNode && (
          <div
            style={{
              position: 'absolute',
              top: selectedNode.position.y,
              left: selectedNode.position.x,
              background: '#ffffff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 1000,
              fontSize: '14px',
              minWidth: '180px',
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing on click inside
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
