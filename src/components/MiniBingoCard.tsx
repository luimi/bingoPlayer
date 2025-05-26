import React from 'react';

interface MiniBingoCardProps {
  card?: number[][];
  numbers?: any;
  showHeaders?: boolean;
}

const MiniBingoCard: React.FC<MiniBingoCardProps> = ({
  card,
  numbers = [],
  showHeaders = true,
}) => {
  return (
    <div className="mini-bingo-card">
      {showHeaders && (
        <>
          <div className="header">B</div>
          <div className="header">I</div>
          <div className="header">N</div>
          <div className="header">G</div>
          <div className="header">O</div>
        </>
      )}
      {card &&
        card.map((row, rIndex) => {
          return row.map((cell, cIndex) => (
            <div
              key={`cell${rIndex}${cIndex}`}
              className={`cell ${numbers.includes(cell) ? 'active' : ''}`}
            >
              {cell !== 0 ? cell : ''}
            </div>
          ));
        })}
    </div>
  );
};

export default MiniBingoCard;
