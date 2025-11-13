import { memo } from 'react';

import { CALENDAR_WEEKS_META_DATA } from '@/components/Calendar/constants';
import { CalendarWeekProps } from '@/components/Calendar/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const CalendarWeek = ({ week }: CalendarWeekProps) => {
  const {
    LABEL: { SHORT, LONG },
  } = CALENDAR_WEEKS_META_DATA[week];

  return (
    <Typography
      aria-label={LONG}
      className='text-center'
      color={COLOR_VARIANTS.GRAY_05}
      role='columnheader'
      variant={TYPOGRAPHY_VARIANTS.BODY_14_R}
    >
      {SHORT}
    </Typography>
  );
};

export default memo(CalendarWeek);
