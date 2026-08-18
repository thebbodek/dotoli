import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import {
  CHECKBOX_CURSOR_STYLES,
  CHECKBOX_INPUT_STYLE,
} from '@/components/Checkbox/constants';
import { CheckboxProps } from '@/components/Checkbox/types';

const CheckboxBase = ({
  checked,
  disabled = false,
  id,
  name,
  value,
  className,
  onChange,
  ref,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
}: PropsWithChildren<CheckboxProps>) => {
  return (
    <label
      className={clsx(
        className,
        disabled
          ? CHECKBOX_CURSOR_STYLES.DISABLED
          : CHECKBOX_CURSOR_STYLES.ENABLED,
      )}
    >
      <input
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        checked={checked}
        className={CHECKBOX_INPUT_STYLE}
        disabled={disabled}
        id={id}
        name={name}
        ref={ref}
        type='checkbox'
        value={value}
        onChange={onChange}
      />
      {children}
    </label>
  );
};

export default CheckboxBase;
