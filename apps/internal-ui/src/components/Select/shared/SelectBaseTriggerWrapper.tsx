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
import { InputTriggerWrapper } from '@/components/shared';

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
        className='text-in-gray-04 shrink-0 text-[0.875rem]'
        iconKey={isOpen ? 'caret-up' : 'caret-down'}
        weight='fill'
        aria-hidden
      />
    );
  };

  return (
    <InputTriggerWrapper
      aria-disabled={disabled}
      className={className}
      disabled={disabled}
      isError={isError}
      ref={ref}
      role='button'
      onClick={onClick}
    >
      {children}
      {subFix()}
    </InputTriggerWrapper>
  );
};

export default SelectBaseTriggerWrapper;
