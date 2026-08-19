import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import {
  TOGGLE_BASE_STYLE,
  TOGGLE_INPUT_STYLE,
} from '@/components/Toggle/constants';
import { ToggleProps } from '@/components/Toggle/types';

const ToggleBase = ({
  checked,
  id,
  name,
  value,
  className,
  onChange,
  ref,
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
}: PropsWithChildren<ToggleProps>) => {
  return (
    <label className={clsx(className, TOGGLE_BASE_STYLE)}>
      <input
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        checked={checked}
        className={TOGGLE_INPUT_STYLE}
        id={id}
        name={name}
        ref={ref}
        role='switch'
        type='checkbox'
        value={value}
        onChange={onChange}
      />
      {children}
    </label>
  );
};

export default ToggleBase;
