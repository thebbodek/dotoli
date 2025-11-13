import clsx from 'clsx';
import { PropsWithChildren, useId } from 'react';

import { TAB_SIZE_STYLES, TAB_THEME_STYLES } from '@/components/Tab/constants';
import { useTabContext } from '@/components/Tab/context';
import TabNumber from '@/components/Tab/TabNumber';
import { TabProps } from '@/components/Tab/types';
import { getPanelId } from '@/components/Tab/utils/getPanelId';

const Tab = ({
  value,
  disabled,
  children,
  onChange,
}: PropsWithChildren<TabProps>) => {
  const {
    variant,
    size,
    theme,
    isFull,
    tabRefs,
    currentValue,
    disabled: isDisabledTab,
    usePanel,
  } = useTabContext();
  const id = useId();
  const isSelected = value === currentValue;
  const panelId = getPanelId({ id });
  const themeStyle = TAB_THEME_STYLES[theme][variant];

  return (
    <button
      className={clsx(
        'text-in-gray-05 in-flex-h-stack-center group relative z-[1] min-w-fit transition-colors disabled:cursor-not-allowed',
        TAB_SIZE_STYLES[variant][size],
        themeStyle.label,
        isSelected
          ? 'disabled:text-in-gray-04 font-bold'
          : 'disabled:text-in-gray-03',
        isFull && 'flex-1',
      )}
      ref={(el) => {
        tabRefs.current[value] = el;
      }}
      aria-controls={usePanel ? panelId : undefined}
      aria-selected={isSelected}
      disabled={disabled || isDisabledTab}
      id={id}
      role='tab'
      tabIndex={isSelected ? 0 : -1}
      type='button'
      onClick={(e) => !disabled && onChange?.(e)}
    >
      {children}
    </button>
  );
};

export default Tab;

Tab.displayName = 'Tab';
Tab.Number = TabNumber;
