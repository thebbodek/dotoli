import clsx from 'clsx';

import {
  TAB_BASE_STYLE,
  TAB_VARIANT_STYLES,
  TAB_VARIANTS,
} from '@/components/Tab/constants';
import TabItem from '@/components/Tab/TabItem';
import { TabProps } from '@/components/Tab/types';

const Tab = ({
  id,
  items,
  value,
  variant = TAB_VARIANTS.LINE,
  onChange,
  className,
  'aria-label': ariaLabel,
}: TabProps) => {
  return (
    <div
      className={clsx(
        className,
        TAB_BASE_STYLE,
        TAB_VARIANT_STYLES[variant].LIST,
      )}
      aria-label={ariaLabel}
      id={id}
      role='tablist'
    >
      {items.map(({ value: itemValue, label }) => (
        <TabItem
          isSelected={itemValue === value}
          key={itemValue}
          label={label}
          tabId={id}
          value={itemValue}
          variant={variant}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default Tab;
