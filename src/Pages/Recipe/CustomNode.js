import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import nodeStyles from './nodeStyle';

const CustomNode = ({ id, type, data, selected }) => {
  const [hovered, setHovered] = useState(false);

  const baseStyle = nodeStyles[type]?.style || {};
  const label = data?.label || nodeStyles[type]?.label || type;
  const bullets = data?.bullets || []; // 기본값 지정 가능

  const style = {
    ...baseStyle,
    position: 'relative',
    // border: selected || hovered ? '2px solid #007aff' : '2px solid transparent',
	border: '2px solid #000000',

    // borderRadius: 8,
    boxShadow: selected || hovered ? '0 0 6px rgba(0, 122, 255, 0.4)' : 'none',
    // transition: 'border 0.2s ease, box-shadow 0.2s ease',
    padding: 10,
    display: 'flex',
    flexDirection: 'column', // <-- 핵심! 세로 정렬
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 큰 라벨 */}
      <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>
  {label}
      </div>

      {bullets.length > 0 && (
        <ul style={{ fontSize: 10, margin: 0, paddingLeft: 18 }}>
          {bullets.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}


      {/* Handles */}
      <Handle type="target" position={Position.Top} id={`${id}-target-top`} />
      <Handle type="source" position={Position.Top} id={`${id}-source-top`} />
      <Handle type="target" position={Position.Bottom} id={`${id}-target-bottom`} />
      <Handle type="source" position={Position.Bottom} id={`${id}-source-bottom`} />
      <Handle type="target" position={Position.Left} id={`${id}-target-left`} />
      <Handle type="source" position={Position.Left} id={`${id}-source-left`} />
      <Handle type="target" position={Position.Right} id={`${id}-target-right`} />
      <Handle type="source" position={Position.Right} id={`${id}-source-right`} />
    </div>
  );
};

export default CustomNode;
