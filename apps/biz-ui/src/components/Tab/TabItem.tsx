import clsx from 'clsx';

import {
  TAB_ITEM_BASE_STYLE,
  TAB_ITEM_STATES,
  TAB_VARIANT_STYLES,
} from '@/components/Tab/constants';
import { TabItemProps } from '@/components/Tab/types';
import { generateTabItemId, generateTabPanelId } from '@/components/Tab/utils';

const TabItem = ({
  tabId,
  value,
  label,
  variant,
  isSelected,
  onChange,
}: TabItemProps) => {
  const { ITEM, STATES } = TAB_VARIANT_STYLES[variant];
  const state = isSelected ? TAB_ITEM_STATES.SELECTED : TAB_ITEM_STATES.DEFAULT;

  const handleClick = () => {
    if (isSelected) return;

    onChange(value);
  };

  return (
    <button
      aria-controls={
        isSelected ? generateTabPanelId({ tabId, value }) : undefined
      }
      aria-selected={isSelected}
      className={clsx(TAB_ITEM_BASE_STYLE, ITEM, STATES[state])}
      id={generateTabItemId({ tabId, value })}
      role='tab'
      type='button'
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default TabItem;
