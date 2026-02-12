import clsx from 'clsx';
import { PropsWithChildren, useId } from 'react';

import { RadioBaseProps } from '@/components/Radio/types';

const RadioBase = ({
  checked = false,
  disabled = false,
  className,
  onChange,
  children,
}: PropsWithChildren<RadioBaseProps>) => {
  const id = useId();
  const labelId = `${id}-label`;

  return (
    <label
      className={clsx(
        className,
        'cursor-pointer has-[.radio:disabled]:cursor-not-allowed',
      )}
      htmlFor={id}
    >
      <input
        aria-labelledby={labelId}
        checked={checked}
        className='radio peer hidden'
        disabled={disabled}
        id={id}
        type='radio'
        onChange={onChange}
      />
      {children}
    </label>
  );
};

export default RadioBase;
