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
        iconKey={isOpen ? 'caret-up' : 'caret-down'}
        className='text-in-gray-04 shrink-0 text-[0.875rem]'
        weight='fill'
        aria-hidden
      />
    );
  };

  return (
    <InputTriggerWrapper
      ref={ref}
      role='button'
      disabled={disabled}
      aria-disabled={disabled}
      isError={isError}
      onClick={onClick}
      className={className}
    >
      {children}
      {subFix()}
    </InputTriggerWrapper>
  );
};

export default SelectBaseTriggerWrapper;
