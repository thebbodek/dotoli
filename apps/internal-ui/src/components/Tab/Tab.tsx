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
    full,
    tabRefs,
    currentValue,
    disabled: tabDisabled,
    usePanel,
  } = useTabContext();
  const id = useId();
  const selected = value === currentValue;
  const panelId = getPanelId({ id });

  return (
    <button
      type='button'
      role='tab'
      id={id}
      tabIndex={selected ? 0 : -1}
      aria-controls={usePanel ? panelId : undefined}
      ref={(el) => {
        tabRefs.current[value] = el;
      }}
      className={clsx(
        'text-in-gray-05 in-flex-h-stack-center group relative z-[1] min-w-fit transition-colors disabled:cursor-not-allowed',
        TAB_SIZE_STYLES[variant][size],
        TAB_THEME_STYLES[theme][variant].label,
        selected
          ? 'disabled:text-in-gray-04 font-bold'
          : 'disabled:text-in-gray-03',
        full && 'flex-1',
      )}
      onClick={(e) => !disabled && onChange?.(e)}
      aria-selected={selected}
      disabled={disabled || tabDisabled}
    >
      {children}
    </button>
  );
};

export default Tab;

Tab.displayName = 'Tab';
Tab.Number = TabNumber;
