import { IconStyle } from '@phosphor-icons/core';
import clsx from 'clsx';

import { IconProps } from '@/components/Icon/types';

const Icon = ({
  iconKey,
  weight = IconStyle.BOLD,
  className,
  title,
}: IconProps) => {
  const iconName = `ph-${iconKey}`;
  const iconWeight = weight === IconStyle.REGULAR ? 'ph' : `ph-${weight}`;

  return (
    <span
      className={clsx(
        'in-flex-h-stack-center',
        iconName,
        iconWeight,
        className,
      )}
      title={title}
    />
  );
};

export default Icon;
