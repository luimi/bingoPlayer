import React from 'react';

interface MiniGameProps {
  numbers?: number[];
}

const MiniGame: React.FC<MiniGameProps> = ({ numbers = [] }) => {
  const allNumbers = getBingoNumbers();
  return (
    <div className="mini-game">
      {allNumbers.map((cell) => {
        return (
          <div
            className={`${Number.isInteger(cell) ? 'cell' : 'header'} ${
              numbers.includes(parseInt(cell + '')) ? 'active' : ''
            }`}
          >
            {cell}
          </div>
        );
      })}
    </div>
  );
};

const getBingoNumbers = () => {
  const bingoLetters = ['B', 'I', 'N', 'G', 'O'];
  let currentNumber = 1;
  let output = [];

  for (let i = 0; i < bingoLetters.length; i++) {
    output.push(bingoLetters[i]);
    for (let j = 0; j < 15; j++) {
      if (currentNumber <= 75) {
        output.push(currentNumber);
        currentNumber++;
      } else {
        break;
      }
    }
  }
  return output;
};
export default MiniGame;
