import clsx from 'clsx';
import { useId } from 'react';

import {
  TOGGLE_SIZES,
  TOGGLE_WITH_LABEL_SIZE_STYLES,
} from '@/components/Toggle/constants';
import ToggleIcon from '@/components/Toggle/ToggleIcon';
import ToggleLabel from '@/components/Toggle/ToggleLabel';
import { ToggleProps } from '@/components/Toggle/types';

const Toggle = ({
  size = TOGGLE_SIZES.SM,
  checked,
  disabled = false,
  label,
  className,
  onChange,
}: ToggleProps) => {
  const id = useId();
  const labelId = `${id}-label`;

  return (
    <label
      className={clsx(
        className,
        'group cursor-pointer',
        label && `flex items-center ${TOGGLE_WITH_LABEL_SIZE_STYLES[size]}`,
        'has-[.toggle:disabled]:cursor-not-allowed',
      )}
      htmlFor={id}
    >
      <input
        aria-labelledby={labelId}
        checked={checked}
        className='toggle peer hidden'
        disabled={disabled}
        id={id}
        type='checkbox'
        onChange={onChange}
      />
      <ToggleIcon size={size} />
      {label && <ToggleLabel label={label} labelId={labelId} size={size} />}
    </label>
  );
};

export default Toggle;
