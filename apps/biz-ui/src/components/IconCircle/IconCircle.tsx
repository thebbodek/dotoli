import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import {
  ICON_CIRCLE_BASE_STYLE,
  ICON_CIRCLE_SIZE_STYLES,
  ICON_CIRCLE_SIZES,
  ICON_CIRCLE_THEME_STYLES,
  ICON_CIRCLE_THEMES,
} from '@/components/IconCircle/constants';
import { IconCircleProps } from '@/components/IconCircle/types';

const IconCircle = ({
  iconKey,
  weight,
  size = ICON_CIRCLE_SIZES.MD,
  theme = ICON_CIRCLE_THEMES.PRIMARY,
  className,
}: IconCircleProps) => {
  const { CONTAINER, ICON } = ICON_CIRCLE_SIZE_STYLES[size];

  return (
    <div
      className={clsx(
        className,
        ICON_CIRCLE_BASE_STYLE,
        CONTAINER,
        ICON,
        ICON_CIRCLE_THEME_STYLES[theme],
      )}
    >
      <Icon iconKey={iconKey} weight={weight} aria-hidden />
    </div>
  );
};

export default IconCircle;
