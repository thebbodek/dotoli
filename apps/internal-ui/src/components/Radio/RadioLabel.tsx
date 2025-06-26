import clsx from 'clsx';

import {
  RADIO_LABEL_SIZE_VARIANTS,
  RADIO_STYLES,
} from '@/components/Radio/constants';
import { RadioLabelProps } from '@/components/Radio/types';
import { Typography } from '@/components/Typography';

const RadioLabel = ({ size, label, labelId }: RadioLabelProps) => {
  return (
    <Typography
      className={clsx(...Object.values(RADIO_STYLES).map(({ label }) => label))}
      id={labelId}
      color='black'
      variant={RADIO_LABEL_SIZE_VARIANTS[size]}
    >
      {label}
    </Typography>
  );
};

export default RadioLabel;
