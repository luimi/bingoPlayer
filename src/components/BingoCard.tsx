import React from 'react';
import { emptySketch } from '../utils/defaults';

interface BingoCardProps {
  sketch?: number[][];
  numbers?: number[];
  isEditing?: boolean;
  unsetNumber?: any;
  setNumber?: any;
  setSketch?: any;
}

const BingoCard: React.FC<BingoCardProps> = ({
  sketch = emptySketch,
  numbers = [],
  isEditing = false,
  unsetNumber,
  setNumber,
  setSketch,
}) => {
  return (
    <div className="bingo-card">
      <div className="grid">
        <div className="header">B</div>
        <div className="header">I</div>
        <div className="header">N</div>
        <div className="header">G</div>
        <div className="header">O</div>

        {sketch.map((row, rIndex) => {
          return row.map((cell, cIndex) => {
            return (
              <div
                key={`cell${rIndex}${cIndex}`}
                className={`cell ${numbers.includes(cell) ? 'active' : ''}`}
                onClick={() => {
                  if (cell === 0 || isEditing) return;
                  if (numbers.includes(cell)) {
                    unsetNumber(cell);
                  } else {
                    setNumber(cell);
                  }
                }}
              >
                {isEditing && (
                  <input
                    type="number"
                    min="0"
                    max="75"
                    style={{ all: 'unset', width: '55px' }}
                    value={sketch[rIndex][cIndex]}
                    onChange={(e) => {
                      if (isNaN(parseInt(e.target.value))) return;
                      let copy = [...sketch];
                      copy[rIndex][cIndex] = parseInt(e.target.value);
                      setSketch(copy);
                    }}
                    onFocus={(e) => e.target.select()}
                  />
                )}
                {!isEditing && cell !== 0 ? cell : ''}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default BingoCard;
