import React from 'react';
import { useDnD } from './DnDContext';
import nodeStyles from './nodeStyle';
import './Recipe.css';

const Sidebar = () => {
  const { setType } = useDnD(); // setType을 사용하여 노드 타입 설정
  console.log('Sidebar')
  return (
    <aside className="sidebar">
      <h3>Node List</h3>
      {['Material', 'Product', 'Process', 'Simulation', 'Analysis', 'Result'].map((type) => (
        <button
          key={type}
          className="node-button"
          onDragStart={() => setType(type)} // 드래그 시작 시 노드 타입 설정
          draggable
          style={{
            ...nodeStyles[type].style, // 스타일을 nodeStyles에서 가져와 적용
            cursor: 'grab',
            width: '70%',
            textAlign: 'center',
          }}
        >
          {nodeStyles[type].label} {/* 노드 레이블 출력 */}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
