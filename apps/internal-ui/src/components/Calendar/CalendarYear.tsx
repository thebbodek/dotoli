import { memo } from 'react';

import { CalendarYearProps } from '@/components/Calendar/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const CalendarYear = ({ year }: CalendarYearProps) => {
  return (
    <Typography
      color={COLOR_VARIANTS.BLACK}
      variant={TYPOGRAPHY_VARIANTS.HEADLINE_20_M}
      className='w-[4.125rem] text-center'
    >
      {year}년
    </Typography>
  );
};

export default memo(CalendarYear);
