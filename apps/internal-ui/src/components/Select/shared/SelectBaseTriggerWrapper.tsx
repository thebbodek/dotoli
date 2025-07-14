import clsx from 'clsx';
import {
  cloneElement,
  isValidElement,
  MouseEvent,
  PropsWithChildren,
} from 'react';

import { Icon } from '@/components/Icon';
import { useSelectTriggerContext } from '@/components/Select/shared/context/SelectTriggerContext';
import { SelectBaseTriggerWrapperProps } from '@/components/Select/shared/types';

const SelectBaseTriggerWrapper = ({
  children,
  className,
  subFixIcon,
}: PropsWithChildren<SelectBaseTriggerWrapperProps>) => {
  const { ref, isOpen, onToggle, disabled, isError } =
    useSelectTriggerContext();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    onToggle();
  };

  const subFix = () => {
    if (subFixIcon && isValidElement(subFixIcon)) {
      return cloneElement(subFixIcon, {
        className: clsx(subFixIcon.props.className, 'text-in-gray-04 shrink-0'),
        weight: 'fill',
        'aria-hidden': true,
      });
    }

    return (
      <Icon
        iconKey={isOpen ? 'caret-up' : 'caret-down'}
        className='text-in-gray-04 shrink-0 text-[0.875rem]'
        weight='fill'
        aria-hidden
      />
    );
  };

  return (
    <div
      ref={ref}
      role='button'
      className={clsx(
        className,
        'border-in-gray-02 rounded-in-8 flex h-[2.5rem] w-full min-w-[20rem] items-center justify-between gap-x-2 overflow-hidden border px-4 py-2',
        !disabled && 'bg-in-white',
        disabled && 'bg-in-gray-02 cursor-not-allowed',
        !isOpen && !disabled && isError && 'border-in-red-04',
      )}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {children}
      {subFix()}
    </div>
  );
};

export default SelectBaseTriggerWrapper;
