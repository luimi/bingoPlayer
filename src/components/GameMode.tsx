import React from 'react';
import { emptySketch } from '../utils/defaults';
import { IonIcon } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';

interface GameModeProps {
  title?: string;
  sketch?: number[][];
  active?: boolean;
  isEditing?: boolean;
}

const GameMode: React.FC<GameModeProps> = ({
  title = 'Title',
  sketch = emptySketch,
  active = false,
  isEditing = false
}) => {
  return (
    <div className={`game-mode ${active ? 'active' : ''}`}>
      <span className="name">{isEditing?<IonIcon icon={closeCircle} color="danger" size="large"/>:title}</span>
      <div className="pattern">
        {sketch.map((row, rowIndex) => {
          return row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell === 1 ? 'filled' : ''}`}
            ></div>
          ));
        })}
      </div>
    </div>
  );
};

export default GameMode;
