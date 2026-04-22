import React, { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { DnDProvider } from './DnDContext';
import Sidebar from './Sidebar';
import DnDFlow from './DnDFlow';
import JSONDisplay from './JSONDisplay';

const Recipe = () => {
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(1);
  const [groupCommand, setGroupCommand] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const makeGroupCommand = (type) => {
    setGroupCommand({
      type,
      timestamp: Date.now(),
    });
  };

  return (
    <ReactFlowProvider>
      <DnDProvider>
        <div className="recipe-container">
          <Sidebar
            selectedRecipeIndex={selectedRecipeIndex}
            onSelectRecipe={setSelectedRecipeIndex}
            onGroup={() => makeGroupCommand('group')}
            onUngroup={() => makeGroupCommand('ungroup')}
            groups={groups}
            selectedGroupId={selectedGroupId}
            onSelectGroup={setSelectedGroupId}
          />

          <DnDFlow
            recipeIndex={selectedRecipeIndex}
            groupCommand={groupCommand}
            onGroupsChange={setGroups}
            selectedGroupId={selectedGroupId}
            onSelectedGroupChange={setSelectedGroupId}
          />
          <JSONDisplay recipeIndex={selectedRecipeIndex} />
        </div>
      </DnDProvider>
    </ReactFlowProvider>
  );
};

export default Recipe;
