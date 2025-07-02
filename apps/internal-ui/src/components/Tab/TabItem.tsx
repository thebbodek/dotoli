import clsx from 'clsx';
import { useId } from 'react';

import { TAB_SIZE_STYLES, TAB_THEME_STYLES } from '@/components/Tab/constants';
import { useTabContext } from '@/components/Tab/context/TabContext';
import TabNumber from '@/components/Tab/TabNumber';
import { TabItemProps } from '@/components/Tab/types';
import { getPanelId } from '@/components/Tab/utils/getPanelId';

const TabItem = ({
  currentValue,
  label,
  value,
  number,
  size,
  theme,
  variant,
  tabRefs,
  disabled,
  full,
  onChange,
}: TabItemProps) => {
  const context = useTabContext();
  const id = useId();
  const panelId = getPanelId({ id });
  const selected = value === currentValue;

  return (
    <button
      type='button'
      role='tab'
      id={id}
      tabIndex={selected ? 0 : -1}
      aria-controls={context && panelId}
      ref={(el) => {
        tabRefs.current[value] = el;
      }}
      className={clsx(
        'text-gray-05 flex-h-stack-center group peer relative z-[1] min-w-fit transition-colors disabled:cursor-not-allowed',
        TAB_SIZE_STYLES[variant][size],
        TAB_THEME_STYLES[theme][variant].label,
        selected ? 'disabled:text-gray-04 font-bold' : 'disabled:text-gray-03',
        full && 'flex-1',
      )}
      onClick={() => !disabled && onChange({ value })}
      aria-selected={selected}
      disabled={disabled}
    >
      {label}
      {number && <TabNumber number={number} theme={theme} variant={variant} />}
    </button>
  );
};

export default TabItem;
