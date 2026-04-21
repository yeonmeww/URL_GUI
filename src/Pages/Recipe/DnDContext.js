import React, { createContext, useContext, useState } from 'react';

const DnDContext = createContext();

export const DnDProvider = ({ children }) => {
  const [type, setType] = useState(null);
  const [selectedBlockId, setSelectedBlockId] = useState(null); // 👈 block_id 상태 추가

  return (
    <DnDContext.Provider value={{ type, setType, selectedBlockId, setSelectedBlockId }}>
      {children}
    </DnDContext.Provider>
  );
};

export const useDnD = () => useContext(DnDContext);
