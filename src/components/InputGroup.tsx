import React from 'react';
import { useTranslation } from 'react-i18next';
import '../utils/I18n';

interface InputGroupProps {
  title?: string;
  onChange?: any;
}

const InputGroup: React.FC<InputGroupProps> = ({
  title = 'Title',
  onChange,
}) => {
  const { t } = useTranslation();
  return (
    <div className="input-group">
      <label htmlFor="patternName" className="label">
        {title}
      </label>
      <input
        type="text"
        id="patternName"
        className="input"
        placeholder={t("inputGroup.placeholder")}
        onChange={onChange}
      />
    </div>
  );
};

export default InputGroup;
