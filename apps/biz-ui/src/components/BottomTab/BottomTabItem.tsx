import clsx from 'clsx';

import {
  BOTTOM_TAB_ICON_WEIGHT,
  BOTTOM_TAB_ITEM_ICON_STYLE,
  BOTTOM_TAB_ITEM_ICON_STYLES,
  BOTTOM_TAB_ITEM_LABEL_STYLE,
  BOTTOM_TAB_ITEM_STATE_STYLES,
  BOTTOM_TAB_ITEM_STYLE,
  BOTTOM_TAB_STATES,
} from '@/components/BottomTab/constants';
import { BottomTabItemProps } from '@/components/BottomTab/types';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const BottomTabItem = ({
  value,
  label,
  iconKey,
  isSelected,
  onChange,
}: BottomTabItemProps) => {
  const { ICON, LABEL } =
    BOTTOM_TAB_ITEM_STATE_STYLES[
      isSelected ? BOTTOM_TAB_STATES.SELECTED : BOTTOM_TAB_STATES.DEFAULT
    ];

  const handleClick = () => onChange(value);

  return (
    <button
      aria-current={isSelected ? 'page' : undefined}
      className={BOTTOM_TAB_ITEM_STYLE}
      type='button'
      onClick={handleClick}
    >
      <Icon
        className={clsx(
          BOTTOM_TAB_ITEM_ICON_STYLE,
          BOTTOM_TAB_ITEM_ICON_STYLES[value],
          ICON,
        )}
        iconKey={iconKey}
        weight={BOTTOM_TAB_ICON_WEIGHT}
        aria-hidden
      />
      <Typography
        className={BOTTOM_TAB_ITEM_LABEL_STYLE}
        color={LABEL}
        variant={TYPOGRAPHY_VARIANTS.CAPTION}
      >
        {label}
      </Typography>
    </button>
  );
};

export default BottomTabItem;
