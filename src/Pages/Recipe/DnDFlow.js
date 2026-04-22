import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
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
import { useDnD } from './DnDContext';
import CustomNode from './CustomNode';
import { useNodesInitialized } from 'reactflow';
import recipeGeneralMock from '../../mocks/recipeInfoGeneral.json';

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
const GROUP_COLORS = ['#ff7b7b', '#7bc7ff', '#9bde7e', '#f7c873', '#c29bff'];

let id = 0;
const getId = () => `dndnode_${id++}`;

const recipeIdMap = {
  1: 'rcp_sim_251215_1',
  2: 'rcp_exp_251215_1038',
  3: 'rcp_exp_251215_1043',
  4: 'rcp_exp_251215_1018',
  5: 'rcp_exp_251215_1060',
};

const getRecipeId = (nextRecipeIndex) => {
  return recipeIdMap[nextRecipeIndex] ?? null;
};

const normalizeRecipeRows = (rowsData) => {
  return rowsData.map((row) => ({
    Work_Order_ID: row.wo_id,
    Recipe_ID: row.rcp_id,
    Module_ID: row.module_id,
    Module_No: row.module_no,
    Block_ID: row.block_id,
    Block_No: row.block_no,
    Block_Type: row.block_type,
    Reference_ID: row.reference_id,
    Reference_Name: row.reference_id ?? null,
    Order_Sequence_Number: row.ord_seq_no,
    Block_Connection_Info: row.block_conn_info,
  }));
};

const recipeLayouts = {
  rcp_sim_251215_1: [
    ['Block_1', 'Block_2', 'Block_3', 'Block_4', 'Block_5', 'Block_6', 'Block_7'],
    ['Block_8', 'Block_9'],
    ['Block_10'],
    ['Block_11', 'Block_12'],
    ['Block_13'],
    ['Block_14'],
    ['Block_15'],
  ],
  rcp_exp_251215_1038: [
    ['Block_1', 'Block_2', 'Block_3'],
    ['Block_4', 'Block_5'],
    ['Block_6'],
    ['Block_7', 'Block_8', 'Block_9'],
    ['Block_10'],
  ],
  rcp_exp_251215_1043: [
    ['Block_1', 'Block_2', 'Block_3', 'Block_4', 'Block_5', 'Block_6', 'Block_7'],
    ['Block_8'],
    ['Block_9'],
    ['Block_10'],
    ['Block_11'],
    ['Block_12'],
    ['Block_13'],
    ['Block_14', 'Block_15'],
    ['Block_16'],
    ['Block_17'],
    ['Block_18'],
    ['Block_19'],
    ['Block_20', 'Block_21'],
    ['Block_22'],
    ['Block_23'],
    ['Block_24'],
    ['Block_25'],
    ['Block_26', 'Block_27', 'Block_28'],
    ['Block_29'],
    ['Block_30'],
    ['Block_31'],
    ['Block_32'],
    ['Block_33'],
    ['Block_34'],
    ['Block_35'],
    ['Block_36'],
    ['Block_37'],
    ['Block_38'],
    ['Block_39'],
    ['Block_40'],
    ['Block_41'],
  ],
  rcp_exp_251215_1018: [
    ['Block_1'],
    ['Block_2'],
    ['Block_3'],
    ['Block_4'],
    ['Block_7', 'Block_14'],
  ],
  rcp_exp_251215_1060: [
    ['Block_1'],
    ['Block_2'],
    ['Block_3'],
  ],
};

const manualPositionsRecipe4 = {
  Block_1: { x: 0, y: 0 },
  Block_2: { x: 0, y: 160 },
  Block_3: { x: 0, y: 320 },
  Block_4: { x: 0, y: 480 },
  Block_7: { x: 0, y: 640 },
  Block_14: { x: 260, y: 640 },
  Block_5: { x: 620, y: 0 },
  Block_6: { x: 880, y: 0 },
  Block_8: { x: 750, y: 160 },
  Block_9: { x: 750, y: 320 },
  Block_10: { x: 750, y: 480 },
  Block_12: { x: 750, y: 640 },
  Block_11: { x: 530, y: 640 },
  Block_13: { x: 1010, y: 640 },
  Block_15: { x: 1010, y: 780 },
  Block_16: { x: 1010, y: 920 },
};

const manualPositionsRecipe3 = {
  Block_1: { x: 0, y: 0 },
  Block_2: { x: 260, y: 0 },
  Block_3: { x: 520, y: 0 },
  Block_4: { x: 780, y: 0 },
  Block_5: { x: 1040, y: 0 },
  Block_6: { x: 1300, y: 0 },
  Block_7: { x: 1560, y: 0 },

  Block_8: { x: 780, y: 160 },
  Block_9: { x: 780, y: 320 },
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

  Block_29: { x: 1170, y: 1440 },
  Block_30: { x: 1430, y: 1440 },
  Block_31: { x: 1300, y: 1600 },
  Block_32: { x: 1300, y: 1760 },
  Block_33: { x: 1300, y: 1920 },
  Block_34: { x: 1300, y: 2080 },

  Block_35: { x: 1040, y: 1920 },
  Block_36: { x: 1040, y: 2080 },
  Block_47: { x: 1040, y: 2240 },

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

const generateNodesAndEdges = (blocks, nextRecipeIndex) => {
  const GAP_X = 260;
  const GAP_Y = 160;
  const GROUP_GAP_X = 600;

  const nodesMap = {};
  const parsedEdges = [];
  let manualPositions = {};

  if (nextRecipeIndex === 3) manualPositions = manualPositionsRecipe3;
  else if (nextRecipeIndex === 4) manualPositions = manualPositionsRecipe4;

  blocks.forEach((block) => {
    nodesMap[block.Block_ID] = block;

    if (!block.Block_Connection_Info) return;
    const matches = block.Block_Connection_Info.match(/\{([^}]+)\}/g) || [];

    matches.forEach((raw) => {
      const [src, h1, tgt, h2] = raw
        .replace(/[{}]/g, '')
        .split(',')
        .map((value) => value.trim().replace(/block_/i, 'Block_'));

      parsedEdges.push({
        src,
        tgt,
        srcHandle: Number(h1),
        tgtHandle: Number(h2),
      });
    });
  });

  const nodeIds = Object.keys(nodesMap);
  const adj = {};
  nodeIds.forEach((nextNodeId) => {
    adj[nextNodeId] = new Set();
  });

  parsedEdges.forEach((edge) => {
    adj[edge.src]?.add(edge.tgt);
    adj[edge.tgt]?.add(edge.src);
  });

  const visited = new Set();
  const connectedGroups = [];

  nodeIds.forEach((nextNodeId) => {
    if (visited.has(nextNodeId)) return;
    const stack = [nextNodeId];
    const connectedGroup = [];

    while (stack.length) {
      const current = stack.pop();
      if (visited.has(current)) continue;
      visited.add(current);
      connectedGroup.push(current);
      adj[current].forEach((neighbor) => stack.push(neighbor));
    }

    connectedGroups.push(connectedGroup);
  });

  const autoPos = {};
  let baseX = 0;

  connectedGroups.forEach((connectedGroup) => {
    const localX = {};
    const localY = {};

    const vEdges = parsedEdges.filter(
      (edge) =>
        connectedGroup.includes(edge.src) &&
        connectedGroup.includes(edge.tgt) &&
        ((edge.srcHandle === 6 && edge.tgtHandle === 12) ||
          (edge.srcHandle === 12 && edge.tgtHandle === 6))
    );

    const vAdj = {};
    connectedGroup.forEach((nextNodeId) => {
      vAdj[nextNodeId] = [];
    });

    vEdges.forEach((edge) => {
      if (edge.srcHandle === 6) vAdj[edge.src].push(edge.tgt);
      else vAdj[edge.tgt].push(edge.src);
    });

    const hasParent = new Set(
      vEdges.map((edge) => (edge.srcHandle === 6 ? edge.tgt : edge.src))
    );

    const roots = connectedGroup.filter((nextNodeId) => !hasParent.has(nextNodeId));

    let yCursor = 0;
    roots.forEach((root) => {
      const queue = [root];
      while (queue.length) {
        const current = queue.shift();
        if (localY[current] !== undefined) continue;
        localY[current] = yCursor++;
        vAdj[current].forEach((neighbor) => queue.push(neighbor));
      }
    });

    const hEdges = parsedEdges.filter(
      (edge) =>
        connectedGroup.includes(edge.src) &&
        connectedGroup.includes(edge.tgt) &&
        ((edge.srcHandle === 3 && edge.tgtHandle === 9) ||
          (edge.srcHandle === 9 && edge.tgtHandle === 3))
    );

    connectedGroup.forEach((nextNodeId) => {
      localX[nextNodeId] = 0;
    });

    hEdges.forEach((edge) => {
      if (edge.srcHandle === 3) {
        localX[edge.tgt] = localX[edge.src] + 1;
        localY[edge.tgt] = localY[edge.src];
      } else {
        localX[edge.tgt] = localX[edge.src] - 1;
        localY[edge.tgt] = localY[edge.src];
      }
    });

    connectedGroup.forEach((nextNodeId) => {
      autoPos[nextNodeId] = {
        x: baseX + localX[nextNodeId],
        y: localY[nextNodeId] ?? 0,
      };
    });

    baseX += GROUP_GAP_X / GAP_X;
  });

  const xs = Object.values(autoPos).map((position) => position.x);
  const ys = Object.values(autoPos).map((position) => position.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);

  const autoPositions = {};
  Object.entries(autoPos).forEach(([nextNodeId, position]) => {
    autoPositions[nextNodeId] = {
      x: (position.x - minX) * GAP_X,
      y: (position.y - minY) * GAP_Y,
    };
  });

  const handleMap = {
    3: ['right', 'left'],
    9: ['left', 'right'],
    6: ['bottom', 'top'],
    12: ['top', 'bottom'],
  };

  const rfEdges = parsedEdges
    .map((edge) => {
      const handles = handleMap[edge.srcHandle];
      if (!handles) return null;

      return {
        id: `e-${edge.src}-${edge.tgt}`,
        source: edge.src,
        target: edge.tgt,
        sourceHandle: `${edge.src}-source-${handles[0]}`,
        targetHandle: `${edge.tgt}-target-${handles[1]}`,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
      };
    })
    .filter(Boolean);

  const typeMap = {
    M: 'Material',
    P: 'Process',
    A: 'Analysis',
    R: 'Result',
    S: 'Simulation',
    PR: 'Product',
  };

  const rfNodes = blocks.map((block) => ({
    id: block.Block_ID,
    type: typeMap[block.Block_Type] || 'default',
    position:
      manualPositions[block.Block_ID] ??
      autoPositions[block.Block_ID] ??
      { x: 0, y: 0 },
    data: {
      label: typeMap[block.Block_Type],
      bullets: block.Reference_Name ? [block.Reference_Name] : [],
    },
    style: nodeStyles[typeMap[block.Block_Type]]?.style,
  }));

  return { nodes: rfNodes, edges: rfEdges };
};

const DnDFlow = ({
  recipeIndex,
  groupCommand,
  onGroupsChange,
  selectedGroupId,
  onSelectedGroupChange,
}) => {
  const nodesInitialized = useNodesInitialized();
  const reactFlowWrapper = useRef(null);
  const lastHandledGroupCommandRef = useRef(null);

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const { screenToFlowPosition, fitView, getViewport, setCenter } = useReactFlow();
  const { type, setSelectedBlockId } = useDnD();

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({ nodes: [], edges: [] });
  const [baseNodes, setBaseNodes] = useState([]);
  const [baseEdges, setBaseEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedNodeIds, setSelectedNodeIds] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupSeq, setGroupSeq] = useState(1);

  const recipeId = getRecipeId(recipeIndex);
  const hasKnownRecipeLayout = Boolean(recipeLayouts[recipeId]?.length);

  const getGroupPosition = useCallback((nodeIds, fallbackPosition = { x: 0, y: 0 }) => {
    const memberNodes = baseNodes.filter((node) => nodeIds.includes(node.id));

    if (memberNodes.length === 0) {
      return fallbackPosition;
    }

    const total = memberNodes.reduce(
      (acc, node) => ({
        x: acc.x + node.position.x,
        y: acc.y + node.position.y,
      }),
      { x: 0, y: 0 }
    );

    return {
      x: total.x / memberNodes.length,
      y: total.y / memberNodes.length,
    };
  }, [baseNodes]);

  useEffect(() => {
    setSelectedNode(null);
    setSelectedNodeIds([]);
    setGroups([]);
    setGroupSeq(1);
    setSelectedBlockId(null);
    onSelectedGroupChange?.(null);
    lastHandledGroupCommandRef.current = null;
    onGroupsChange?.([]);
  }, [recipeId, setSelectedBlockId, onGroupsChange, onSelectedGroupChange]);

  useEffect(() => {
    if (!recipeIndex) return;

    const fetchNodesData = async () => {
      setLoading(true);
      try {
        const normalized = normalizeRecipeRows(recipeGeneralMock);
        const filtered = normalized.filter((item) => item.Recipe_ID === recipeId);

        if (filtered.length === 0 && !hasKnownRecipeLayout) {
          setInitialData({ nodes: [], edges: [] });
          return;
        }

        const processed = generateNodesAndEdges(filtered, recipeIndex);
        setInitialData(processed);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNodesData();
  }, [recipeIndex, recipeId, hasKnownRecipeLayout]);

  useEffect(() => {
    setBaseNodes(initialData.nodes ?? []);
    setBaseEdges(initialData.edges ?? []);
  }, [initialData]);

  useEffect(() => {
    if (!nodesInitialized) return;
    fitView({ padding: 0.1, duration: 300 });
  }, [recipeIndex, nodesInitialized, fitView]);

  const onNodesChange = useCallback((changes) => {
    setNodes((currentNodes) => applyNodeChanges(changes, currentNodes));

    setBaseNodes((prevNodes) => {
      const baseNodeChanges = changes.filter((change) =>
        prevNodes.some((node) => node.id === change.id)
      );

      return baseNodeChanges.length > 0
        ? applyNodeChanges(baseNodeChanges, prevNodes)
        : prevNodes;
    });

    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        const positionChange = changes.find(
          (change) =>
            change.id === group.id &&
            change.type === 'position' &&
            change.position
        );

        if (!positionChange) {
          return group;
        }

        return {
          ...group,
          position: positionChange.position,
        };
      })
    );
  }, [setNodes]);

  const onEdgesChange = useCallback((changes) => {
    setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges));

    setBaseEdges((prevEdges) => {
      const baseEdgeChanges = changes.filter(
        (change) =>
          !String(change.id).startsWith('group-edge-') &&
          prevEdges.some((edge) => edge.id === change.id)
      );

      return baseEdgeChanges.length > 0
        ? applyEdgeChanges(baseEdgeChanges, prevEdges)
        : prevEdges;
    });
  }, [setEdges]);

  useEffect(() => {
    const groupedNodeIdToGroup = new Map();

    groups.forEach((group) => {
      group.nodeIds.forEach((nodeId) => {
        groupedNodeIdToGroup.set(nodeId, group);
      });
    });

    const visibleNodes = baseNodes
      .filter((node) => !groupedNodeIdToGroup.has(node.id))
      .map((node) => ({
        ...node,
        data: {
          ...node.data,
          isGroup: false,
          isSelected: selectedNodeIds.includes(node.id),
        },
        style: {
          ...node.style,
          ...(selectedNodeIds.includes(node.id)
            ? { boxShadow: '0 0 0 4px rgba(0,123,255,0.35)' }
            : {}),
        },
      }));

    const collapsedGroupNodes = groups.map((group) => {
      const position = group.position ?? getGroupPosition(group.nodeIds);
      const isSelected = selectedGroupId === group.id;
      const memberLabels = (group.originalNodes ?? [])
        .map((node) => node.data?.label ?? node.type ?? node.id);

      return {
        id: group.collapsedNodeId ?? group.id,
        type: 'Process',
        position,
        data: {
          label: group.label,
          bullets: memberLabels.slice(0, 3),
          isGroup: true,
          isGroupNode: true,
          groupId: group.id,
          isSelected,
          nodeStyle: {
            width: 220,
            minHeight: 90,
            border: isSelected ? `4px solid ${group.color}` : `3px solid ${group.color}`,
            borderRadius: 16,
            background: isSelected ? '#eef6ff' : '#fff8e8',
            boxShadow: isSelected
              ? '0 0 0 5px rgba(0,123,255,0.35)'
              : '0px 4px 4px rgba(0, 0, 0, 0.25)',
          },
        },
        style: {
          width: 220,
          minHeight: 90,
          zIndex: 50,
          pointerEvents: 'all',
          cursor: 'pointer',
        },
        selectable: true,
        draggable: true,
      };
    });

    const visibleEdgesMap = new Map();

    baseEdges.forEach((edge) => {
      const sourceGroup = groupedNodeIdToGroup.get(edge.source);
      const targetGroup = groupedNodeIdToGroup.get(edge.target);

      if (sourceGroup && targetGroup && sourceGroup.id === targetGroup.id) {
        return;
      }

      const mappedSource = sourceGroup?.collapsedNodeId ?? sourceGroup?.id ?? edge.source;
      const mappedTarget = targetGroup?.collapsedNodeId ?? targetGroup?.id ?? edge.target;
      const isCollapsedEdge = mappedSource !== edge.source || mappedTarget !== edge.target;
      const edgeKey = `${mappedSource}->${mappedTarget}`;

      if (isCollapsedEdge && visibleEdgesMap.has(edgeKey)) {
        return;
      }

      visibleEdgesMap.set(
        edgeKey,
        isCollapsedEdge
          ? {
              id: `group-edge-${edgeKey}`,
              source: mappedSource,
              target: mappedTarget,
              sourceHandle: `${mappedSource}-source-bottom`,
              targetHandle: `${mappedTarget}-target-top`,
              type: 'smoothstep',
              markerEnd: { type: MarkerType.ArrowClosed },
            }
          : edge
      );
    });

    setNodes([...visibleNodes, ...collapsedGroupNodes]);
    setEdges(Array.from(visibleEdgesMap.values()));
  }, [baseNodes, baseEdges, groups, selectedNodeIds, selectedGroupId, getGroupPosition, setNodes, setEdges]);

  useEffect(() => {
    if (!onGroupsChange) return;

    const nextGroupInfos = groups.map((group) => ({
      id: group.id,
      label: group.label,
      color: group.color,
      members: group.nodeIds.map((nodeId) => {
        const node = group.originalNodes?.find((item) => item.id === nodeId)
          ?? baseNodes.find((item) => item.id === nodeId);
        return {
          id: node?.id ?? nodeId,
          label: node?.data?.label ?? node?.type ?? 'Node',
        };
      }),
    }));

    onGroupsChange(nextGroupInfos);
  }, [groups, baseNodes, onGroupsChange]);

  const onConnect = useCallback((params) => {
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

    setBaseEdges((prevEdges) => addEdge(newEdge, prevEdges));
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    if (!type) return;

    const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: nodeStyles[type]?.label },
      style: nodeStyles[type]?.style ?? nodeStyles.default?.style,
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
    setBaseNodes((prevNodes) => prevNodes.concat(newNode));
  }, [screenToFlowPosition, type]);

  const onNodeClick = useCallback((event, node) => {
    event.stopPropagation();

    const isMultiSelect = event.ctrlKey || event.metaKey || event.shiftKey;
    const isGroupNode = Boolean(node.data?.isGroup || node.data?.isGroupNode);
    const viewport = getViewport();

    if (isGroupNode) {
      setSelectedBlockId(null);
      onSelectedGroupChange?.(node.data?.groupId ?? node.id);
      setSelectedNodeIds([]);
      setSelectedNode({
        id: node.id,
        data: node.data,
        position: {
          x: node.position.x * viewport.zoom + viewport.x,
          y: node.position.y * viewport.zoom + viewport.y,
        },
      });
    } else {
      onSelectedGroupChange?.(null);
      setSelectedBlockId(node.id);
      setSelectedNode({
        id: node.id,
        data: node.data,
        position: {
          x: node.position.x * viewport.zoom + viewport.x,
          y: node.position.y * viewport.zoom + viewport.y,
        },
      });
      setSelectedNodeIds((prev) => {
        if (!isMultiSelect) {
          return [node.id];
        }

        if (prev.includes(node.id)) {
          return prev.filter((nextId) => nextId !== node.id);
        }

        return [...prev, node.id];
      });
    }
  }, [getViewport, onSelectedGroupChange, setSelectedBlockId]);

  const onEdgeClick = useCallback((event, edge) => {
    console.log('Edge clicked:', edge);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedNodeIds([]);
    setSelectedBlockId(null);
    onSelectedGroupChange?.(null);
  }, [setSelectedBlockId, onSelectedGroupChange]);

  const handleGroupSelected = useCallback(() => {
    const groupedNodeIds = new Set(groups.flatMap((group) => group.nodeIds));
    const selectedBaseNodeIds = selectedNodeIds.filter(
      (nodeId) =>
        baseNodes.some((node) => node.id === nodeId) &&
        !groupedNodeIds.has(nodeId)
    );

    if (selectedBaseNodeIds.length < 2) {
      alert('두 개 이상의 노드를 선택하세요.');
      return;
    }

    const newGroup = {
      id: `group_${groupSeq}`,
      label: `Group ${groupSeq}`,
      color: GROUP_COLORS[(groupSeq - 1) % GROUP_COLORS.length],
      nodeIds: selectedBaseNodeIds,
      originalNodes: baseNodes
        .filter((node) => selectedBaseNodeIds.includes(node.id))
        .map((node) => ({ ...node, data: { ...node.data }, style: { ...node.style } })),
      originalEdges: baseEdges
        .filter(
          (edge) =>
            selectedBaseNodeIds.includes(edge.source) ||
            selectedBaseNodeIds.includes(edge.target)
        )
        .map((edge) => ({ ...edge })),
      collapsedNodeId: `group_${groupSeq}`,
      position: getGroupPosition(selectedBaseNodeIds),
    };

    setGroups((prev) => [...prev, newGroup]);
    setGroupSeq((prev) => prev + 1);
    setSelectedNode(null);
    setSelectedBlockId(null);
    setSelectedNodeIds([]);
    onSelectedGroupChange?.(newGroup.id);
  }, [selectedNodeIds, groups, groupSeq, baseNodes, getGroupPosition, setSelectedBlockId, onSelectedGroupChange]);

  const handleUngroupSelected = useCallback(() => {
    const selectedGroupIds = selectedGroupId
      ? [selectedGroupId]
      : selectedNodeIds.filter((nodeId) =>
          groups.some((group) => group.id === nodeId)
        );

    if (selectedGroupIds.length === 0) {
      alert('Ungroup할 그룹 노드를 선택하세요.');
      return;
    }

    setGroups((prevGroups) =>
      prevGroups.filter((group) => !selectedGroupIds.includes(group.id))
    );
    setSelectedNode(null);
    setSelectedBlockId(null);
    setSelectedNodeIds([]);
    onSelectedGroupChange?.(null);
  }, [selectedGroupId, selectedNodeIds, groups, setSelectedBlockId, onSelectedGroupChange]);

  useEffect(() => {
    if (!groupCommand) return;
    if (lastHandledGroupCommandRef.current === groupCommand.timestamp) return;

    lastHandledGroupCommandRef.current = groupCommand.timestamp;

    if (groupCommand.type === 'group') {
      handleGroupSelected();
    } else if (groupCommand.type === 'ungroup') {
      handleUngroupSelected();
    }
  }, [groupCommand, handleGroupSelected, handleUngroupSelected]);

  useEffect(() => {
    if (!selectedGroupId) return;

    const selectedGroup = groups.find((group) => group.id === selectedGroupId);
    if (!selectedGroup) {
      onSelectedGroupChange?.(null);
      return;
    }

    const position = selectedGroup.position ?? getGroupPosition(selectedGroup.nodeIds);
    const memberLabels = selectedGroup.nodeIds
      .map((nodeId) => baseNodes.find((node) => node.id === nodeId))
      .filter(Boolean)
      .map((node) => node.data?.label ?? node.type ?? node.id);

    setSelectedNode({
      id: selectedGroup.id,
      data: {
        label: selectedGroup.label,
        bullets: memberLabels,
        isGroup: true,
        isGroupNode: true,
        groupId: selectedGroup.id,
      },
      position,
    });
    setSelectedNodeIds([]);
    setSelectedBlockId(null);
    setCenter(position.x + 110, position.y + 45, { zoom: 0.8, duration: 250 });
  }, [selectedGroupId, groups, baseNodes, getGroupPosition, setCenter, setSelectedBlockId, onSelectedGroupChange]);

  return (
    <div className="dndflow" style={{ position: 'relative' }}>
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
          onPaneClick={onPaneClick}
          defaultViewport={defaultViewport}
          minZoom={0.1}
          maxZoom={4}
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
              <circle
                cx={props.toX}
                cy={props.toY}
                fill="#fff"
                r={3}
                stroke="#222"
                strokeWidth={1.5}
              />
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
            onClick={(event) => event.stopPropagation()}
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
