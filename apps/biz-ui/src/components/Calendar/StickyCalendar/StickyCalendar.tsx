import clsx from 'clsx';

import {
  STICKY_CALENDAR_BASE_STYLE,
  STICKY_CALENDAR_WEEKDAY_ROW_STYLE,
  STICKY_CALENDAR_WEEKDAY_STYLE,
  STICKY_CALENDAR_WEEKDAYS,
} from '@/components/Calendar/StickyCalendar/constants';
import StickyCalendarDateSelect from '@/components/Calendar/StickyCalendar/StickyCalendarDateSelect';
import { StickyCalendarProps } from '@/components/Calendar/StickyCalendar/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const StickyCalendar = ({
  dateSelectOption,
  useWeekday = true,
  className,
}: StickyCalendarProps) => {
  return (
    <div className={clsx(className, STICKY_CALENDAR_BASE_STYLE)}>
      {!!dateSelectOption && <StickyCalendarDateSelect {...dateSelectOption} />}
      {useWeekday && (
        <div className={STICKY_CALENDAR_WEEKDAY_ROW_STYLE}>
          {STICKY_CALENDAR_WEEKDAYS.map(({ label, color }) => (
            <div className={STICKY_CALENDAR_WEEKDAY_STYLE} key={label}>
              <Typography
                color={color}
                variant={TYPOGRAPHY_VARIANTS.LABEL_BOLD}
              >
                {label}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StickyCalendar;
