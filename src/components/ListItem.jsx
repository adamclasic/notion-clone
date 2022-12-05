import React, { useState } from 'react';
const ListItem = ({ focus, blockType, onClick }) => {
  const [IsHovered, setIsHovered] = useState(false);
  const { name, shortcut, iconSrc } = blockType;
  return (
    <div
      {...{ onClick }}
      className="list-item"
      style={{ backgroundColor: IsHovered || focus ? '#f3f4f6' : 'unset' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="icon-cont">
        <div
          style={{
            backgroundImage: `url(${iconSrc})`,
          }}
        ></div>
      </div>

      <div>
        <div className="block-title">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '6px', fontWeight: 600 }}>{name}</span>
          </div>
        </div>

        <div className="block-title-secondary">Shortcut: {shortcut}</div>
      </div>
    </div>
  );
};
export default ListItem;
