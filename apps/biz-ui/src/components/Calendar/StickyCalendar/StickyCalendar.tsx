import clsx from 'clsx';

import { CALENDAR_WEEK_START_DAYS } from '@/components/Calendar/shared';
import {
  STICKY_CALENDAR_BASE_STYLE,
  STICKY_CALENDAR_WEEKDAY_ROW_STYLE,
  STICKY_CALENDAR_WEEKDAY_STYLE,
} from '@/components/Calendar/StickyCalendar/constants';
import StickyCalendarDateSelect from '@/components/Calendar/StickyCalendar/StickyCalendarDateSelect';
import { StickyCalendarProps } from '@/components/Calendar/StickyCalendar/types';
import { rotateStickyCalendarWeekdays } from '@/components/Calendar/StickyCalendar/utils';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const StickyCalendar = ({
  dateSelectOption,
  useWeekday = true,
  weekStartDay = CALENDAR_WEEK_START_DAYS.SUNDAY,
  className,
}: StickyCalendarProps) => {
  return (
    <div className={clsx(className, STICKY_CALENDAR_BASE_STYLE)}>
      {!!dateSelectOption && <StickyCalendarDateSelect {...dateSelectOption} />}
      {useWeekday && (
        <div className={STICKY_CALENDAR_WEEKDAY_ROW_STYLE}>
          {rotateStickyCalendarWeekdays({ weekStartDay }).map(
            ({ label, color }) => (
              <div className={STICKY_CALENDAR_WEEKDAY_STYLE} key={label}>
                <Typography
                  color={color}
                  variant={TYPOGRAPHY_VARIANTS.LABEL_BOLD}
                >
                  {label}
                </Typography>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default StickyCalendar;
