import React from 'react';
import { emptySketch } from '../utils/defaults';

interface GameModeProps {
  title?: string;
  sketch?: number[][];
  active?: boolean;
}

const GameMode: React.FC<GameModeProps> = ({
  title = 'Title',
  sketch = emptySketch,
  active = false,
}) => {
  return (
    <div className={`game-mode ${active ? 'active' : ''}`}>
      <span className="name">{title}</span>
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
