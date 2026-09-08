import clsx from 'clsx';

import BottomTabItem from '@/components/BottomTab/BottomTabItem';
import {
  BOTTOM_TAB_ARIA_LABEL,
  BOTTOM_TAB_BASE_STYLE,
  BOTTOM_TAB_ITEMS,
} from '@/components/BottomTab/constants';
import { BottomTabProps } from '@/components/BottomTab/types';

const BottomTab = ({
  value,
  hrefs,
  replace,
  onTabSelect,
  className,
}: BottomTabProps) => {
  return (
    <nav
      aria-label={BOTTOM_TAB_ARIA_LABEL}
      className={clsx(className, BOTTOM_TAB_BASE_STYLE)}
    >
      {BOTTOM_TAB_ITEMS.map((item) => (
        <BottomTabItem
          {...item}
          href={hrefs[item.value]}
          isSelected={item.value === value}
          key={item.value}
          replace={replace}
          onTabSelect={onTabSelect}
        />
      ))}
    </nav>
  );
};

export default BottomTab;
