import { memo } from 'react';

import { CALENDAR_WEEKS_META_DATA } from '@/components/Calendar/constants';
import { CalendarWeekProps } from '@/components/Calendar/types';
import { Typography } from '@/components/Typography';

const CalendarWeek = ({ week }: CalendarWeekProps) => {
  const {
    LABEL: { SHORT, LONG },
  } = CALENDAR_WEEKS_META_DATA[week];

  return (
    <Typography
      role='columnheader'
      variant='body-14-r'
      className='text-center'
      aria-label={LONG}
      color={'gray-05'}
    >
      {SHORT}
    </Typography>
  );
};

export default memo(CalendarWeek);
