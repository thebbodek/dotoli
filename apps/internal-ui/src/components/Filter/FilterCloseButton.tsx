import clsx from 'clsx';

import { IconButton } from '@/components/Button';
import { FilterCloseButtonProps } from '@/components/Filter/types';

const FilterCloseButton = ({ className, onClose }: FilterCloseButtonProps) => {
  return (
    <IconButton
      className={clsx('text-[1rem]', className)}
      arialLabel='닫기'
      iconKey='x'
      onClick={onClose}
    />
  );
};

export default FilterCloseButton;
