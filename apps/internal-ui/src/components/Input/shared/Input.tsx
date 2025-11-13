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
  const isDisabled = disabled || readOnly;
  const isInput = as === INPUT_ELEMENTS.INPUT;
  const canReset = !!onReset && value && !isDisabled;

  const _props = {
    readOnly,
    required,
    value: value ?? '',
    disabled: isDisabled,
    placeholder,
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
