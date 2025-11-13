import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import { MultiSelectBaseCheckIconProps } from '@/components/Select/Multi/shared/types';

const MultiSelectBaseCheckIcon = ({
  isSelected,
}: MultiSelectBaseCheckIconProps) => {
  return (
    <Icon
      className={clsx(
        'text-in-gray-03 text-[1rem]',
        isSelected && 'text-in-primary-06',
      )}
      iconKey='check'
      aria-hidden
    />
  );
};

export default MultiSelectBaseCheckIcon;
