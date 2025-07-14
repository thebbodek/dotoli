import { memo } from 'react';

import { CalendarMonthProps } from '@/components/Calendar/types';
import { Typography } from '@/components/Typography';

const CalendarMonth = ({ month }: CalendarMonthProps) => {
  return (
    <Typography variant='body-16-m' color='black'>
      {month + 1}월
    </Typography>
  );
};

export default memo(CalendarMonth);
