import React from 'react';

interface SketchProps {
  pattern?: any;
  setPatern?: any;
}

const Sketch: React.FC<SketchProps> = ({ pattern, setPatern }) => {
  return (
    <div className="sketch">
      <div className="header">B</div>
      <div className="header">I</div>
      <div className="header">N</div>
      <div className="header">G</div>
      <div className="header">O</div>
      {pattern &&
        pattern.sketch.map((row: number[], rIndex: number) => {
          return row.map((cell, cIndex) => (
            <div
              key={`cell${rIndex}${cIndex}`}
              className={`cell ${cell === 1 ? 'active' : ''}`}
              onClick={() => {
                let copy = [...pattern.sketch];
                copy[rIndex][cIndex] = copy[rIndex][cIndex] === 0 ? 1 : 0;
                setPatern({ ...pattern, sketch: copy });
              }}
            ></div>
          ));
        })}
    </div>
  );
};

export default Sketch;
