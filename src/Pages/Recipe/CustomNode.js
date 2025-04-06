// CustomNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';
import nodeStyles from './nodeStyle';

const CustomNode = ({ id, type, data }) => {
  const baseStyle = nodeStyles[type]?.style || {};
  const label = data?.label || nodeStyles[type]?.label || type;

  const style = {
    ...baseStyle,
    position: 'relative',
  };



  return (
    <div style={style}>
      {label}

      {/* Top */}
      <Handle
        type="target"
        position={Position.Top}
        id={`${id}-target-top`}

      />
      <Handle
        type="source"
        position={Position.Top}
        id={`${id}-source-top`}

      />

      {/* Bottom */}
      <Handle
        type="target"
        position={Position.Bottom}
        id={`${id}-target-bottom`}

      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${id}-source-bottom`}

      />

      {/* Left */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-target-left`}
 
      />
      <Handle
        type="source"
        position={Position.Left}
        id={`${id}-source-left`}

      />

      {/* Right */}
      <Handle
        type="target"
        position={Position.Right}
        id={`${id}-target-right`}

      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-source-right`}

      />
    </div>
  );
};

export default CustomNode;
