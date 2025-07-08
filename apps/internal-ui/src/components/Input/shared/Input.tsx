import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { InputHTMLAttributes, Ref } from 'react';

import {
  INPUT_ELEMENTS,
  INPUT_POPOVER_OFFSET,
} from '@/components/Input/shared/constants';
import { useInputContext } from '@/components/Input/shared/context/InputContext';
import InputIconButton from '@/components/Input/shared/InputIconButton';
import {
  InputElement,
  InputElementType,
  InputProps,
} from '@/components/Input/shared/types';
import { InputTriggerWrapper } from '@/components/shared';

const Popover = dynamic(() => import('@/components/Popover/Popover/Popover'), {
  ssr: false,
});

const Input = <T extends InputElementType, P extends InputElement<T>>({
  as = INPUT_ELEMENTS.INPUT as T,
  variant,
  value,
  addonEnd,
  popover,
  isFocused,
  setIsFocused,
  onReset,
  ref,
  className,
  required = false,
  disabled = false,
  readOnly = false,
  inputClassName,
  ...props
}: InputProps<T, P>) => {
  const { feedbackId, isError } = useInputContext();
  const isDisabled = disabled || readOnly;
  const isInput = as === INPUT_ELEMENTS.INPUT;
  const canReset = !!onReset && value && !isDisabled;

  const _props = {
    value,
    readOnly,
    required,
    disabled: isDisabled,
    onFocus: popover ? () => setIsFocused(true) : undefined,
    onBlur: popover ? () => setIsFocused(false) : undefined,
    'aria-invalid': isError,
    'aria-errormessage': feedbackId,
    className: clsx(
      inputClassName,
      'input placeholder-in-gray-04 disabled:placeholder-in-gray-05 w-full text-inherit focus:outline-none disabled:cursor-not-allowed',
    ),
    ...props,
  };

  const renderer = () => {
    const input = isInput ? (
      <input
        ref={ref as Ref<HTMLInputElement>}
        type={(props as InputHTMLAttributes<HTMLInputElement>).type ?? 'text'}
        {..._props}
      />
    ) : (
      <textarea ref={ref as Ref<HTMLTextAreaElement>} {..._props} />
    );

    return (
      <InputTriggerWrapper
        variant={variant}
        isError={isError}
        disabled={isDisabled}
        className={clsx(
          className,
          !isError &&
            'focus-within:border-in-primary-05 focus-within:outline-in-gray-02 focus-within:outline-2',
        )}
      >
        {input}
        <InputIconButton
          ariaLabel='초기화'
          disabled={isDisabled}
          iconKey={'x-circle'}
          onClick={onReset}
          className={clsx(canReset ? 'visible' : 'invisible')}
        />
        {addonEnd && addonEnd}
      </InputTriggerWrapper>
    );
  };

  return popover ? (
    <Popover
      trigger={renderer()}
      isOpen={isFocused}
      offset={INPUT_POPOVER_OFFSET}
      onPopoverClose={() => setIsFocused(false)}
      useAutoFocus={false}
      applyMaxWidth
    >
      <div>{popover}</div>
    </Popover>
  ) : (
    renderer()
  );
};

export default Input;
