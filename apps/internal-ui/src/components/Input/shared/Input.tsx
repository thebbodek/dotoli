import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { InputHTMLAttributes, Ref } from 'react';

import {
  INPUT_ELEMENT_STYLES,
  INPUT_ELEMENTS,
  INPUT_POPOVER_OFFSET,
  INPUT_STYLES,
  INPUT_VARIANTS,
} from '@/components/Input/shared/constants';
import InputIconButton from '@/components/Input/shared/InputIconButton';
import {
  InputElement,
  InputElementType,
  InputProps,
} from '@/components/Input/shared/types';

const Popover = dynamic(() => import('@/components/Popover/Popover/Popover'), {
  ssr: false,
});

const Input = <T extends InputElementType, P extends InputElement<T>>({
  as = INPUT_ELEMENTS.INPUT as T,
  variant = INPUT_VARIANTS.INPUT,
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
  ...props
}: InputProps<T, P>) => {
  const isDisabled = disabled || readOnly;
  const isInput = as === INPUT_ELEMENTS.INPUT;
  const useReset = !!onReset;
  const canReset = value && !isDisabled;

  const _props = {
    value,
    readOnly,
    required,
    disabled: disabled || readOnly,
    onFocus: popover ? () => setIsFocused(true) : undefined,
    onBlur: popover ? () => setIsFocused(false) : undefined,
    className:
      'input text-inherit focus:outline-none placeholder-gray-04 flex-1 disabled:cursor-not-allowed',
    ...props,
  };

  const render = () => {
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
      <div
        className={clsx(
          className,
          'rounded-8 flex items-center gap-x-2 px-4',
          INPUT_ELEMENT_STYLES[variant],
          ...Object.values(INPUT_STYLES),
        )}
      >
        {input}
        {useReset && canReset && (
          <InputIconButton
            aria-label='초기화'
            disabled={isDisabled}
            iconKey={'x-circle'}
            onClick={onReset}
          />
        )}
        {addonEnd && addonEnd}
      </div>
    );
  };

  return popover ? (
    <Popover
      trigger={render()}
      isOpen={isFocused}
      offset={INPUT_POPOVER_OFFSET}
      onPopoverClose={() => setIsFocused(false)}
      useAutoFocus={false}
      applyMaxWidth
    >
      <div>{popover}</div>
    </Popover>
  ) : (
    render()
  );
};

export default Input;
