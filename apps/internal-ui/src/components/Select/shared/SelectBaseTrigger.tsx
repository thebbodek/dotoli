import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { Icon } from '@/components/Icon';
import { useSelectTriggerContext } from '@/components/Select/shared/context/SelectTriggerContext';
import { SelectBaseTriggerProps } from '@/components/Select/shared/types';

const SelectBaseTrigger = ({
  children,
  className,
}: PropsWithChildren<SelectBaseTriggerProps>) => {
  const { ref, isOpen, onToggle, disabled, isError } =
    useSelectTriggerContext();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    onToggle();
  };

  return (
    <div
      ref={ref}
      role='button'
      className={clsx(
        className,
        'border-gray-02 rounded-8 flex h-[2.5rem] w-full items-center justify-between gap-x-2 overflow-hidden border px-4 py-2',
        !disabled && 'bg-white',
        disabled && 'bg-gray-02 cursor-not-allowed',
        !isOpen && !disabled && isError && 'border-red-04',
      )}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {children}
      <Icon
        iconKey={isOpen ? 'caret-up' : 'caret-down'}
        className='text-gray-04 shrink-0 text-[0.875rem]'
        weight='fill'
        aria-hidden
      />
    </div>
  );
};

export default SelectBaseTrigger;
