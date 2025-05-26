import React from 'react';

interface ButtonAccentProps {
  text?: string;
  action?: any;
}

const ButtonAccent: React.FC<ButtonAccentProps> = ({
  text = 'Text',
  action,
}) => {
  return (
    <button className="button-accent" onClick={action}>
      {text.toUpperCase()}
    </button>
  );
};

export default ButtonAccent;
