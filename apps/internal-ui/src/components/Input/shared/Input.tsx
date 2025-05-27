import clsx from 'clsx';
import { InputHTMLAttributes, Ref, useRef } from 'react';

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
import usePopoverPosition from '@/components/Popover/Popover/hooks/usePopoverPosition';
import { Portal } from '@/components/Portal';

const Input = <T extends InputElementType, P extends InputElement<T>>({
  as = INPUT_ELEMENTS.INPUT as T,
  variant = INPUT_VARIANTS.INPUT,
  value,
  addonEnd,
  ref,
  className,
  required = false,
  disabled = false,
  readOnly = false,
  onReset,
  popover,
  isFocused,
  setIsFocused,
  ...props
}: InputProps<T, P>) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isDisabled = disabled || readOnly;
  const isInput = as === INPUT_ELEMENTS.INPUT;

  const { style } = usePopoverPosition({
    offset: INPUT_POPOVER_OFFSET,
    applyMaxWidth: true,
    triggerRef,
    popoverRef,
    isOpen: !!popover && isFocused,
    depth: [value],
  });

  const defaultProps = {
    value,
    readOnly,
    required,
    disabled: disabled || readOnly,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    className:
      'input text-inherit focus:outline-none placeholder-gray-04 flex-1 disabled:cursor-not-allowed',
    ...props,
  };

  const input = isInput ? (
    <input
      ref={ref as Ref<HTMLInputElement>}
      type={(props as InputHTMLAttributes<HTMLInputElement>).type ?? 'text'}
      {...defaultProps}
    />
  ) : (
    <textarea ref={ref as Ref<HTMLTextAreaElement>} {...defaultProps} />
  );

  return (
    <div
      ref={triggerRef}
      className={clsx(
        className,
        'rounded-8 flex items-center gap-x-2 px-4',
        INPUT_ELEMENT_STYLES[variant],
        ...Object.values(INPUT_STYLES),
      )}
    >
      {input}
      {onReset && value && !isDisabled && (
        <InputIconButton
          aria-label='초기화'
          disabled={isDisabled}
          iconKey={'x-circle'}
          onClick={onReset}
        />
      )}
      {addonEnd && addonEnd}
      {isFocused && popover && (
        <Portal>
          <div ref={popoverRef} style={style}>
            {popover}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Input;
