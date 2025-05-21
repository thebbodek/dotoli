import clsx from 'clsx';

import {
  TOGGLE_LABEL_SIZE_VARIANTS,
  TOGGLE_STYLES,
} from '@/components/Toggle/constants';
import { ToggleLabelProps } from '@/components/Toggle/types';
import { Typography } from '@/components/Typography';

const ToggleLabel = ({ label, labelId, size }: ToggleLabelProps) => {
  return (
    <Typography
      className={clsx(
        'transition-[color]',
        ...Object.values(TOGGLE_STYLES).map(({ label }) => label),
      )}
      id={labelId}
      variant={TOGGLE_LABEL_SIZE_VARIANTS[size]}
    >
      {label}
    </Typography>
  );
};

export default ToggleLabel;
