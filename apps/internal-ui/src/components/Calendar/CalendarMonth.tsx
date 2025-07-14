import { memo } from 'react';

import { CalendarMonthProps } from '@/components/Calendar/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const CalendarMonth = ({ month }: CalendarMonthProps) => {
  return (
    <Typography
      variant={TYPOGRAPHY_VARIANTS.BODY_16_M}
      color={COLOR_VARIANTS.BLACK}
    >
      {month + 1}월
    </Typography>
  );
};

export default memo(CalendarMonth);
