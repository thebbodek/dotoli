import clsx from 'clsx';

import { CALENDAR_DAY_BUTTON_DAY_OFFSET_STYLE } from '@/components/Calendar/CalendarDayButton/constants';
import {
  CALENDAR_DAY_STATUS_BASE_STYLE,
  CALENDAR_DAY_STATUS_CHECK_BADGE_STYLE,
  CALENDAR_DAY_STATUS_CHECK_ICON_KEY,
  CALENDAR_DAY_STATUS_CHECK_ICON_STYLE,
  CALENDAR_DAY_STATUS_CHECK_ICON_WEIGHT,
  CALENDAR_DAY_STATUS_COLORS,
  CALENDAR_DAY_STATUS_SR_LABEL_STYLE,
  CALENDAR_DAY_STATUS_STYLES,
  CALENDAR_DAY_STATUS_VISUAL_STYLE,
  CALENDAR_DAY_STATUSES,
} from '@/components/Calendar/CalendarDayStatus/constants';
import { CalendarDayStatusProps } from '@/components/Calendar/CalendarDayStatus/types';
import { generateCalendarDayStatusSrLabel } from '@/components/Calendar/CalendarDayStatus/utils';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const CalendarDayStatus = ({
  day,
  date,
  status,
  statusLabel,
  className,
}: CalendarDayStatusProps) => {
  const hasDate = date !== undefined;
  const color = CALENDAR_DAY_STATUS_COLORS[status];
  const srLabel = generateCalendarDayStatusSrLabel({ day, date, statusLabel });

  return (
    <div
      className={clsx(
        className,
        CALENDAR_DAY_STATUS_BASE_STYLE,
        CALENDAR_DAY_STATUS_STYLES[status],
      )}
    >
      <span className={CALENDAR_DAY_STATUS_VISUAL_STYLE} aria-hidden>
        <Typography
          variant={
            hasDate ? TYPOGRAPHY_VARIANTS.LABEL : TYPOGRAPHY_VARIANTS.BODY
          }
          className={clsx(hasDate && CALENDAR_DAY_BUTTON_DAY_OFFSET_STYLE)}
          color={color}
        >
          {day}
        </Typography>
        {hasDate && (
          <Typography color={color} variant={TYPOGRAPHY_VARIANTS.BODY}>
            {date}
          </Typography>
        )}
      </span>
      {status === CALENDAR_DAY_STATUSES.DONE && (
        <span className={CALENDAR_DAY_STATUS_CHECK_BADGE_STYLE} aria-hidden>
          <Icon
            className={CALENDAR_DAY_STATUS_CHECK_ICON_STYLE}
            iconKey={CALENDAR_DAY_STATUS_CHECK_ICON_KEY}
            weight={CALENDAR_DAY_STATUS_CHECK_ICON_WEIGHT}
          />
        </span>
      )}
      <span className={CALENDAR_DAY_STATUS_SR_LABEL_STYLE}>{srLabel}</span>
    </div>
  );
};

export default CalendarDayStatus;
