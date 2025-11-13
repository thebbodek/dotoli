import clsx from 'clsx';

import { IconButton } from '@/components/Button';
import { FilterCloseButtonProps } from '@/components/Filter/types';

const FilterCloseButton = ({ className, onClose }: FilterCloseButtonProps) => {
  return (
    <IconButton
      aria-label='닫기'
      className={clsx('text-[1rem]', className)}
      iconKey='x'
      onClick={onClose}
    />
  );
};

export default FilterCloseButton;
