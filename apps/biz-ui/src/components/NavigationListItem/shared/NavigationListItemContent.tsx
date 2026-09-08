import { Icon } from '@/components/Icon';
import {
  NAVIGATION_LIST_ITEM_CARET_ICON_KEY,
  NAVIGATION_LIST_ITEM_CARET_STYLE,
  NAVIGATION_LIST_ITEM_LABEL_STYLE,
  NAVIGATION_LIST_ITEM_TRAILING_STYLE,
} from '@/components/NavigationListItem/shared/constants';
import { NavigationListItemOption } from '@/components/NavigationListItem/shared/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const NavigationListItemContent = ({
  label,
  value,
}: NavigationListItemOption) => {
  return (
    <>
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
          iconKey={NAVIGATION_LIST_ITEM_CARET_ICON_KEY}
          aria-hidden
        />
      </span>
    </>
  );
};

export default NavigationListItemContent;
