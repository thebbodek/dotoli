import clsx from 'clsx';

import {
  TOGGLE_LABEL_SIZE_VARIANTS,
  TOGGLE_STYLES,
} from '@/components/Toggle/constants';
import { ToggleLabelProps } from '@/components/Toggle/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS } from '@/variants';

const ToggleLabel = ({
  label,
  labelId,
  size,
  color = COLOR_VARIANTS.BLACK,
  className,
}: ToggleLabelProps) => {
  return (
    <Typography
      className={clsx(
        className,
        'transition-[color]',
        ...Object.values(TOGGLE_STYLES).map(({ label }) => label),
      )}
      color={color}
      id={labelId}
      variant={TOGGLE_LABEL_SIZE_VARIANTS[size]}
    >
      {label}
    </Typography>
  );
};

export default ToggleLabel;
