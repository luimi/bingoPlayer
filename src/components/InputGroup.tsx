import React from 'react';

interface InputGroupProps {
  title?: string;
  onChange?: any;
}

const InputGroup: React.FC<InputGroupProps> = ({
  title = 'Title',
  onChange,
}) => {
  return (
    <div className="input-group">
      <label htmlFor="patternName" className="label">
        {title}
      </label>
      <input
        type="text"
        id="patternName"
        className="input"
        placeholder="Escribe aquí"
        onChange={onChange}
      />
    </div>
  );
};

export default InputGroup;
