import { MouseEvent } from 'react';

import { Icon } from '@/components/Icon';
import { SelectBaseResetButtonProps } from '@/components/Select/shared/types';

const SelectBaseResetButton = ({ onClick }: SelectBaseResetButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onClick?.(e);
  };

  return (
    <button
      type={'button'}
      aria-label={'초기화'}
      className={'shrink-0 cursor-pointer'}
      onClick={handleClick}
    >
      <Icon
        iconKey={'x-circle'}
        weight={'fill'}
        className='text-in-gray-05 text-[1.125rem]'
      />
    </button>
  );
};

export default SelectBaseResetButton;
