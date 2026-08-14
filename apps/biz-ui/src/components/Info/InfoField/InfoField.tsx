import clsx from 'clsx';

import {
  INFO_FIELD_BASE_STYLE,
  INFO_FIELD_COLORS,
  INFO_FIELD_LAYOUT_STYLES,
  INFO_FIELD_LAYOUTS,
  INFO_FIELD_VALUE_STYLE,
} from '@/components/Info/InfoField/constants';
import { InfoFieldProps } from '@/components/Info/InfoField/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const InfoField = ({
  label,
  value,
  layout = INFO_FIELD_LAYOUTS.HORIZONTAL,
  className,
}: InfoFieldProps) => {
  const { CONTAINER, VALUE_VARIANT } = INFO_FIELD_LAYOUT_STYLES[layout];

  return (
    <div className={clsx(className, INFO_FIELD_BASE_STYLE, CONTAINER)}>
      <Typography
        color={INFO_FIELD_COLORS.LABEL}
        variant={TYPOGRAPHY_VARIANTS.BODY}
      >
        {label}
      </Typography>
      <Typography
        className={INFO_FIELD_VALUE_STYLE}
        color={INFO_FIELD_COLORS.VALUE}
        variant={VALUE_VARIANT}
      >
        {value}
      </Typography>
    </div>
  );
};

export default InfoField;
