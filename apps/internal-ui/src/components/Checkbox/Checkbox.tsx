import clsx from 'clsx';
import { useId } from 'react';

import CheckboxIcon from '@/components/Checkbox/CheckboxIcon';
import CheckboxLabel from '@/components/Checkbox/CheckboxLabel';
import { CHECKBOX_SIZES } from '@/components/Checkbox/constants';
import { CheckboxProps } from '@/components/Checkbox/types';

const Checkbox = ({
  size = CHECKBOX_SIZES.SM,
  checked = false,
  disabled = false,
  label,
  className,
  onChange,
}: CheckboxProps) => {
  const id = useId();
  const labelId = `${id}-label`;

  return (
    <label
      className={clsx(
        className,
        'group',
        label && 'flex items-center gap-x-2',
        !disabled ? 'cursor-pointer' : 'cursor-not-allowed',
      )}
      htmlFor={id}
    >
      <input
        aria-labelledby={labelId}
        checked={checked}
        className='hidden'
        disabled={disabled}
        id={id}
        type='checkbox'
        onChange={onChange}
      />
      <CheckboxIcon size={size} />
      {label && <CheckboxLabel label={label} labelId={labelId} size={size} />}
    </label>
  );
};

export default Checkbox;
