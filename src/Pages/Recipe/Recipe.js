import React, { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { DnDProvider } from './DnDContext';
import Sidebar from './Sidebar';
import DnDFlow from './DnDFlow';
import JSONDisplay from './JSONDisplay';

const Recipe = () => {
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(1); // 기본값 1

  return (
    <ReactFlowProvider>
      <DnDProvider>
        <div className="recipe-container">
          <Sidebar
            selectedRecipeIndex={selectedRecipeIndex}
            onSelectRecipe={setSelectedRecipeIndex}
          />

          <DnDFlow recipeIndex={selectedRecipeIndex} />
          <JSONDisplay recipeIndex={selectedRecipeIndex} />
        </div>
      </DnDProvider>
    </ReactFlowProvider>
  );
};

export default Recipe;
