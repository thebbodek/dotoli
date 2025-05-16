'use client';

import { CheckboxProps } from '@/components/Checkbox/types';

const Checkbox = ({
  checked,
  onChange,
  disabled,
  readOnly,
  label,
}: CheckboxProps) => {
  return (
    <label>
      <input
        checked={checked}
        disabled={disabled}
        readOnly={readOnly}
        type='checkbox'
        onChange={onChange}
      />
      {label && label}
    </label>
  );
};

export default Checkbox;
