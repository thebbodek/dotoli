import clsx from 'clsx';

import {
  ICON_CLASS_PREFIX,
  ICON_DEFAULT_WEIGHT,
  ICON_WEIGHTS,
} from '@/components/Icon/constants';
import { IconProps } from '@/components/Icon/types';

const Icon = ({
  iconKey,
  weight = ICON_DEFAULT_WEIGHT,
  className,
  title,
  'aria-hidden': ariaHidden,
}: IconProps) => {
  const iconName = `${ICON_CLASS_PREFIX}-${iconKey}`;
  const iconWeight =
    weight === ICON_WEIGHTS.REGULAR
      ? ICON_CLASS_PREFIX
      : `${ICON_CLASS_PREFIX}-${weight}`;

  return (
    <span
      aria-hidden={ariaHidden}
      className={clsx('flex-h-stack-center', iconName, iconWeight, className)}
      title={title}
    />
  );
};

export default Icon;
