import React from 'react';
import { useDnD } from './DnDContext';
import { useNavigate } from 'react-router-dom';
import nodeStyles from './nodeStyle';
import './Recipe.css';

const recipeList = ['recipe_1', 'recipe_2', 'recipe_3', 'recipe_4', 'recipe_5'];

const Sidebar = ({ selectedRecipeIndex, onSelectRecipe }) => {
  const { setType } = useDnD();
  // const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar_node">
      <h3>Node List</h3>

      {['Material', 'Product', 'Process', 'Simulation', 'Analysis', 'Result'].map((type) => (
        <button
          key={type}
          className="node-button"
          draggable
          onDragStart={() => setType(type)}
          style={{
            ...nodeStyles[type].style,
            cursor: 'grab',
            width: '70%',
            textAlign: 'center',
          }}
        >
          {nodeStyles[type].label}
        </button>
      ))}
    </div>
      {/* 하단 Recipe List */}
      <div className="sidebar_recipe">
        <h4>Recipe List</h4>
        <div className="recipe-button-row">
           {[1, 2, 3, 4, 5].map((idx) => (
          <button
            key={idx}
            className={selectedRecipeIndex === idx ? 'active' : ''}
            onClick={() => onSelectRecipe(idx)}
          >
            {idx}
          </button>
        ))}
        </div>
    </div>
    </aside>
  );
};

export default Sidebar;
