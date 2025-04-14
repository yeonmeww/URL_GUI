import React, { useEffect, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
}from 'reactflow';
import 'reactflow/dist/style.css';
import './Recipe.css';
import Sidebar from './Sidebar';

import { DnDProvider } from './DnDContext';
import DnDFlow from './DnDFlow';
import JSONDisplay from './JSONDisplay';

const Recipe = () => {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <div className="recipe-container">
          <DnDFlow />
        </div>
      </DnDProvider>
       <JSONDisplay />  {/* 오른쪽에 JSON 데이터를 표시 */}
    </ReactFlowProvider>
    
  );
};

export default Recipe;



