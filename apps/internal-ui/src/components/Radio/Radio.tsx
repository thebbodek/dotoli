import clsx from 'clsx';
import { useId } from 'react';

import { RADIO_SIZES } from '@/components/Radio/constants';
import RadioBase from '@/components/Radio/RadioBase';
import RadioIcon from '@/components/Radio/RadioIcon';
import RadioLabel from '@/components/Radio/RadioLabel';
import { RadioProps } from '@/components/Radio/types';

const Radio = ({
  size = RADIO_SIZES.SM,
  checked,
  disabled,
  label,
  className,
  onChange,
}: RadioProps) => {
  const id = useId();
  const labelId = `${id}-label`;

  return (
    <RadioBase
      checked={checked}
      className={clsx(className, label && 'flex items-center gap-x-2')}
      disabled={disabled}
      onChange={onChange}
    >
      <RadioIcon size={size} />
      {label && <RadioLabel label={label} labelId={labelId} size={size} />}
    </RadioBase>
  );
};

export default Radio;
