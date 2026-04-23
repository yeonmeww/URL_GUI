import React from 'react';
import { useDnD } from './DnDContext';
import nodeStyles from './nodeStyle';
import './Recipe.css';

const Sidebar = ({
  selectedRecipeIndex,
  onSelectRecipe,
  onGroup,
  onUngroup,
  groups,
  selectedGroupId,
  onSelectGroup,
}) => {
  const { setType } = useDnD();

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

      <div
        className="sidebar_recipe"
        style={{ height: 'auto', minHeight: '120px', alignItems: 'stretch' }}
      >
        <h4>Grouping</h4>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button type="button" onClick={onGroup}>
            Group
          </button>
          <button type="button" onClick={onUngroup}>
            Ungroup
          </button>
        </div>
      </div>

      <div
        className="sidebar_recipe"
        style={{ height: 'auto', minHeight: '180px', alignItems: 'stretch' }}
      >
        <h4>Group Information</h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
          }}
        >
          {groups.length === 0 ? (
            <div style={{ fontSize: '12px', textAlign: 'center', color: '#666' }}>
              No groups created
            </div>
          ) : (
            groups.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => onSelectGroup(group.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border:
                    selectedGroupId === group.id
                      ? `2px solid ${group.color}`
                      : '1px solid #cfd4da',
                  background: selectedGroupId === group.id ? '#eef6ff' : '#fff',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontWeight: 600 }}>{group.label}</div>
                <div style={{ fontSize: '12px', color: '#555' }}>
                  {group.members
                    ?.map((member) => member.label || member.id)
                    .join(', ')}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

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
