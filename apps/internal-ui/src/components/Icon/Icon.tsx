import { IconStyle } from '@phosphor-icons/core';
import clsx from 'clsx';

import { IconProps } from '@/components/Icon/types';

const Icon = ({ iconKey, weight, className, ...props }: IconProps) => {
  const iconName = `ph-${iconKey}`;
  const iconWeight =
    !weight || weight === IconStyle.REGULAR ? 'ph' : `ph-${weight}`;

  return (
    <span
      className={clsx(
        'flex items-center justify-center',
        iconName,
        iconWeight,
        className,
      )}
      {...props}
    />
  );
};

export default Icon;
