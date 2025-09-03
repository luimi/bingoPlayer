import React from 'react';
import { useTranslation } from 'react-i18next';
import '../utils/I18n';

interface ItemNewProps {
  description?: string;
  buttons?: any[];
}

const ItemNew: React.FC<ItemNewProps> = ({ description, buttons = [] }) => {
  const { t } = useTranslation();
  return (
    <div className="item-new">
      <div className="texts">
        <span className="label">{t("itemNew.new")}</span>
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
