import clsx from 'clsx';

import { IconCircle } from '@/components/IconCircle';
import {
  MENU_ITEM_BASE_STYLE,
  MENU_ITEM_COLORS,
  MENU_ITEM_CONTENT_STYLE,
  MENU_ITEM_ICON_SIZE,
  MENU_ITEM_ICON_THEME,
  MENU_ITEM_ICON_WEIGHT,
  MENU_ITEM_TEXT_STYLE,
} from '@/components/MenuItem/constants';
import { MenuItemProps } from '@/components/MenuItem/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const MenuItem = ({
  iconKey,
  label,
  description,
  className,
  onClick,
  ref,
}: MenuItemProps) => {
  return (
    <button
      className={clsx(className, MENU_ITEM_BASE_STYLE)}
      ref={ref}
      type='button'
      onClick={onClick}
    >
      <IconCircle
        iconKey={iconKey}
        size={MENU_ITEM_ICON_SIZE}
        theme={MENU_ITEM_ICON_THEME}
        weight={MENU_ITEM_ICON_WEIGHT}
      />
      <span className={MENU_ITEM_CONTENT_STYLE}>
        <Typography
          className={MENU_ITEM_TEXT_STYLE}
          color={MENU_ITEM_COLORS.LABEL}
          variant={TYPOGRAPHY_VARIANTS.BODY_LG_SEMIBOLD}
        >
          {label}
        </Typography>
        <Typography
          className={MENU_ITEM_TEXT_STYLE}
          color={MENU_ITEM_COLORS.DESCRIPTION}
          variant={TYPOGRAPHY_VARIANTS.BODY}
        >
          {description}
        </Typography>
      </span>
    </button>
  );
};

export default MenuItem;
