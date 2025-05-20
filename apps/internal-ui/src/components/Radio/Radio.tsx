import clsx from 'clsx';
import { useId } from 'react';

import { RADIO_SIZES } from '@/components/Radio/constants';
import RadioIcon from '@/components/Radio/RadioIcon';
import RadioLabel from '@/components/Radio/RadioLabel';
import { RadioProps } from '@/components/Radio/types';

const Radio = ({
  size = RADIO_SIZES.SM,
  checked = false,
  disabled = false,
  label,
  className,
  onChange,
}: RadioProps) => {
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
        type='radio'
        onChange={onChange}
      />
      <RadioIcon size={size} />
      {label && <RadioLabel label={label} labelId={labelId} size={size} />}
    </label>
  );
};

export default Radio;
