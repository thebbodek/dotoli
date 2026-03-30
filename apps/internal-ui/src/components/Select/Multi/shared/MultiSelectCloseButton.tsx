import clsx from 'clsx';

import { IconButton } from '@/components/Button';
import { MultiSelectCloseButtonProps } from '@/components/Select/Multi/shared/types';

const MultiSelectCloseButton = ({
  className,
  onClose,
}: MultiSelectCloseButtonProps) => {
  return (
    <IconButton
      aria-label='닫기'
      className={clsx('text-[1rem]', className)}
      iconKey='x'
      onClick={onClose}
    />
  );
};

export default MultiSelectCloseButton;
