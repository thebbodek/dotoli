import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { FocusEvent, InputHTMLAttributes, Ref } from 'react';

import {
  INPUT_ELEMENTS,
  INPUT_POPOVER_OFFSET,
  INPUT_TYPES,
} from '@/components/Input/shared/constants';
import { useInputContext } from '@/components/Input/shared/context/InputContext';
import useNumberInputWheelGuard from '@/components/Input/shared/hooks/useNumberInputWheelGuard';
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
  value,
  variant,
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
  placeholder = '입력해주세요',
  ...props
}: InputProps<T, P>) => {
  const { feedbackId, isError } = useInputContext();
  const inputType = (props as InputHTMLAttributes<HTMLInputElement>).type;
  const {
    handleFocus: handleWheelGuardFocus,
    handleBlur: handleWheelGuardBlur,
  } = useNumberInputWheelGuard({ type: inputType });
  const isDisabled = disabled || readOnly;
  const isInput = as === INPUT_ELEMENTS.INPUT;
  const canReset = !!onReset && value && !isDisabled;

  const handleFocus = (e: FocusEvent<HTMLElement>) => {
    handleWheelGuardFocus(e);

    if (popover) setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    handleWheelGuardBlur(e);

    if (popover) setIsFocused(false);
  };

  const _props = {
    readOnly,
    required,
    value: value ?? '',
    disabled: isDisabled,
    placeholder,
    onFocus: handleFocus,
    onBlur: handleBlur,
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
        type={inputType ?? INPUT_TYPES.TEXT}
        {..._props}
      />
    ) : (
      <textarea ref={ref as Ref<HTMLTextAreaElement>} {..._props} />
    );

    return (
      <InputTriggerWrapper
        className={clsx(
          className,
          !isError &&
            'focus-within:border-in-primary-05 focus-within:outline-in-gray-02 focus-within:outline-2',
        )}
        disabled={isDisabled}
        isError={isError}
        variant={variant}
      >
        {input}
        <InputIconButton
          aria-label='초기화'
          className={clsx(canReset ? 'visible' : 'invisible')}
          disabled={isDisabled}
          iconKey='x-circle'
          onClick={onReset}
        />
        {addonEnd && addonEnd}
      </InputTriggerWrapper>
    );
  };

  return popover ? (
    <Popover
      isOpen={isFocused}
      offset={INPUT_POPOVER_OFFSET}
      trigger={renderer()}
      useAutoFocus={false}
      applyMaxWidth
      onPopoverClose={() => setIsFocused(false)}
    >
      <div>{popover}</div>
    </Popover>
  ) : (
    renderer()
  );
};

export default Input;
