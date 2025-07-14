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
      role='columnheader'
      variant={TYPOGRAPHY_VARIANTS.BODY_14_R}
      className='text-center'
      aria-label={LONG}
      color={COLOR_VARIANTS.GRAY_05}
    >
      {SHORT}
    </Typography>
  );
};

export default memo(CalendarWeek);
