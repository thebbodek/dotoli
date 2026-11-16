import {
  ORDER_WEEK_STATUS_DATE_COLOR,
  ORDER_WEEK_STATUS_DATE_STYLE,
  ORDER_WEEK_STATUS_DAY_STYLE,
  ORDER_WEEK_STATUS_DAY_VISUAL_STYLE,
  ORDER_WEEK_STATUS_SIZES,
  ORDER_WEEK_STATUS_SR_LABEL_STYLE,
  ORDER_WEEK_STATUS_WEEKDAY_COLORS,
} from '@/components/Order/OrderWeekStatus/constants';
import OrderWeekStatusMark from '@/components/Order/OrderWeekStatus/OrderWeekStatusMark';
import { OrderWeekStatusDayProps } from '@/components/Order/OrderWeekStatus/types';
import { generateOrderWeekStatusSrLabel } from '@/components/Order/OrderWeekStatus/utils';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderWeekStatusDay = ({
  dayLabel,
  date,
  status,
  size,
}: OrderWeekStatusDayProps) => {
  const shouldShowDate =
    size === ORDER_WEEK_STATUS_SIZES.LG && date !== undefined;
  const srLabel = generateOrderWeekStatusSrLabel({ dayLabel, date, status });

  return (
    <li className={ORDER_WEEK_STATUS_DAY_STYLE}>
      <span className={ORDER_WEEK_STATUS_DAY_VISUAL_STYLE} aria-hidden>
        {shouldShowDate && (
          <Typography
            className={ORDER_WEEK_STATUS_DATE_STYLE}
            color={ORDER_WEEK_STATUS_DATE_COLOR}
            variant={TYPOGRAPHY_VARIANTS.CAPTION}
          >
            {date}
          </Typography>
        )}
        <Typography
          color={ORDER_WEEK_STATUS_WEEKDAY_COLORS[status]}
          variant={TYPOGRAPHY_VARIANTS.LABEL_BOLD}
        >
          {dayLabel}
        </Typography>
        <OrderWeekStatusMark size={size} status={status} />
      </span>
      <span className={ORDER_WEEK_STATUS_SR_LABEL_STYLE}>{srLabel}</span>
    </li>
  );
};

export default OrderWeekStatusDay;
