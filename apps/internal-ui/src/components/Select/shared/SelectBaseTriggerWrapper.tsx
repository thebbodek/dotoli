import clsx from 'clsx';
import { MouseEvent, PropsWithChildren } from 'react';

import { Icon } from '@/components/Icon';
import { useSelectTriggerContext } from '@/components/Select/shared/context/SelectTriggerContext';
import { SelectBaseTriggerWrapperProps } from '@/components/Select/shared/types';

const SelectBaseTriggerWrapper = ({
  children,
  className,
}: PropsWithChildren<SelectBaseTriggerWrapperProps>) => {
  const { ref, isOpen, onToggle, disabled, isError } =
    useSelectTriggerContext();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    onToggle();
  };

  return (
    <div
      ref={ref}
      role='button'
      className={clsx(
        className,
        'border-in-gray-02 rounded-in-8 flex h-[2.5rem] w-full items-center justify-between gap-x-2 overflow-hidden border px-4 py-2',
        !disabled && 'bg-in-white',
        disabled && 'bg-in-gray-02 cursor-not-allowed',
        !isOpen && !disabled && isError && 'border-in-red-04',
      )}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {children}
      <Icon
        iconKey={isOpen ? 'caret-up' : 'caret-down'}
        className='text-in-gray-04 shrink-0 text-[0.875rem]'
        weight='fill'
        aria-hidden
      />
    </div>
  );
};

export default SelectBaseTriggerWrapper;
