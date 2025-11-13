import clsx from 'clsx';

import {
  CHECKBOX_LABEL_SIZE_VARIANTS,
  CHECKBOX_STYLES,
} from '@/components/Checkbox/constants';
import { CheckboxLabelProps } from '@/components/Checkbox/types';
import { Typography } from '@/components/Typography';

const CheckboxLabel = ({ size, label, labelId }: CheckboxLabelProps) => {
  return (
    <Typography
      className={clsx(
        ...Object.values(CHECKBOX_STYLES).map(({ label }) => label),
      )}
      color='black'
      id={labelId}
      variant={CHECKBOX_LABEL_SIZE_VARIANTS[size]}
    >
      {label}
    </Typography>
  );
};

export default CheckboxLabel;
