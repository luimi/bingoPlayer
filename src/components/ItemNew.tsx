import React from 'react';

interface ItemNewProps {
  description?: string;
  buttons?: any[];
}

const ItemNew: React.FC<ItemNewProps> = ({ description, buttons = [] }) => {
  return (
    <div className="item-new">
      <div className="texts">
        <span className="label">Nuevo</span>
        <span className="value">{description}</span>
      </div>
      <div className="buttons">
        {buttons.map((button, index) => (
          <button key={index} className="icon-button" onClick={button.action}>
            {button.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ItemNew;
