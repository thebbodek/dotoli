import { memo } from 'react';

import { CalendarMonthProps } from '@/components/Calendar/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const CalendarMonth = ({ month }: CalendarMonthProps) => {
  return (
    <Typography
      color={COLOR_VARIANTS.BLACK}
      variant={TYPOGRAPHY_VARIANTS.BODY_16_M}
    >
      {month + 1}월
    </Typography>
  );
};

export default memo(CalendarMonth);
