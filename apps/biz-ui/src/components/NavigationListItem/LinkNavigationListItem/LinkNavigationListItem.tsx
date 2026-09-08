import clsx from 'clsx';
import Link from 'next/link';

import { LinkNavigationListItemProps } from '@/components/NavigationListItem/LinkNavigationListItem/types';
import { NAVIGATION_LIST_ITEM_BASE_STYLE } from '@/components/NavigationListItem/shared/constants';
import NavigationListItemContent from '@/components/NavigationListItem/shared/NavigationListItemContent';

const LinkNavigationListItem = ({
  label,
  value,
  className,
  ref,
  ...props
}: LinkNavigationListItemProps) => {
  return (
    <Link
      {...props}
      className={clsx(className, NAVIGATION_LIST_ITEM_BASE_STYLE)}
      ref={ref}
    >
      <NavigationListItemContent label={label} value={value} />
    </Link>
  );
};

export default LinkNavigationListItem;
