import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import { MultiSelectCheckIconProps } from '@/components/Select/MultiSelect/types';

const MultiSelectCheckIcon = ({
  activeClassName,
}: MultiSelectCheckIconProps) => {
  return (
    <Icon
      iconKey='check'
      className={clsx('text-gray-03 text-[1rem]', activeClassName)}
      aria-hidden
    />
  );
};

export default MultiSelectCheckIcon;
