import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import {
  TAB_SIZES,
  TAB_THEME_STYLES,
  TAB_THEMES,
  TAB_VARIANTS,
} from '@/components/Tab/constants';
import TabIndicator from '@/components/Tab/TabIndicator';
import TabItem from '@/components/Tab/TabItem';
import { TabProps } from '@/components/Tab/types';

const Tab = ({
  currentValue,
  items,
  tabRefs,
  variant = TAB_VARIANTS.LINE,
  theme = TAB_THEMES.GRAY,
  size = TAB_SIZES.MD,
  ariaLabel,
  disabled = false,
  full = false,
  className,
  onChange,
}: PropsWithChildren<TabProps>) => {
  return (
    <div
      role='tablist'
      aria-label={ariaLabel}
      className={clsx(
        className,
        'relative flex items-center',
        TAB_THEME_STYLES[theme][variant].list,
      )}
    >
      {items.map((item) => (
        <TabItem
          key={item.value}
          currentValue={currentValue}
          onChange={onChange}
          size={size}
          theme={theme}
          variant={variant}
          tabRefs={tabRefs}
          disabled={disabled || item.disabled}
          full={full}
          {...item}
        />
      ))}
      <TabIndicator
        variant={variant}
        theme={theme}
        currentValue={currentValue}
        tabRefs={tabRefs}
      />
    </div>
  );
};

export default Tab;
