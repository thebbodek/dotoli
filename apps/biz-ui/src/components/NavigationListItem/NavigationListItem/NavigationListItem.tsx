import clsx from 'clsx';

import { NavigationListItemProps } from '@/components/NavigationListItem/NavigationListItem/types';
import { NAVIGATION_LIST_ITEM_BASE_STYLE } from '@/components/NavigationListItem/shared/constants';
import NavigationListItemContent from '@/components/NavigationListItem/shared/NavigationListItemContent';

const NavigationListItem = ({
  label,
  value,
  className,
  onClick,
}: NavigationListItemProps) => {
  return (
    <button
      className={clsx(className, NAVIGATION_LIST_ITEM_BASE_STYLE)}
      type='button'
      onClick={onClick}
    >
      <NavigationListItemContent label={label} value={value} />
    </button>
  );
};

export default NavigationListItem;
