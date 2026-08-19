import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import {
  NAVIGATION_LIST_ITEM_BASE_STYLE,
  NAVIGATION_LIST_ITEM_CARET_STYLE,
  NAVIGATION_LIST_ITEM_LABEL_STYLE,
  NAVIGATION_LIST_ITEM_TRAILING_STYLE,
} from '@/components/NavigationListItem/constants';
import { NavigationListItemProps } from '@/components/NavigationListItem/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

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
      <Typography
        className={NAVIGATION_LIST_ITEM_LABEL_STYLE}
        color={COLOR_VARIANTS.GRAY_600}
        variant={TYPOGRAPHY_VARIANTS.BODY}
      >
        {label}
      </Typography>
      <span className={NAVIGATION_LIST_ITEM_TRAILING_STYLE}>
        {!!value && (
          <Typography
            color={COLOR_VARIANTS.GRAY_700}
            variant={TYPOGRAPHY_VARIANTS.BODY_SEMIBOLD}
          >
            {value}
          </Typography>
        )}
        <Icon
          className={NAVIGATION_LIST_ITEM_CARET_STYLE}
          iconKey='caret-right'
          aria-hidden
        />
      </span>
    </button>
  );
};

export default NavigationListItem;
