import clsx from 'clsx';

import {
  ORDER_WEEK_STATUS_BASE_STYLE,
  ORDER_WEEK_STATUS_SIZES,
} from '@/components/Order/OrderWeekStatus/constants';
import OrderWeekStatusDay from '@/components/Order/OrderWeekStatus/OrderWeekStatusDay';
import { OrderWeekStatusProps } from '@/components/Order/OrderWeekStatus/types';

const OrderWeekStatus = ({
  days,
  size = ORDER_WEEK_STATUS_SIZES.LG,
  className,
  'aria-label': ariaLabel,
}: OrderWeekStatusProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul
      aria-label={ariaLabel}
      className={clsx(className, ORDER_WEEK_STATUS_BASE_STYLE)}
      role='list'
    >
      {days.map(({ dayLabel, date, status }) => (
        <OrderWeekStatusDay
          date={date}
          dayLabel={dayLabel}
          key={dayLabel}
          size={size}
          status={status}
        />
      ))}
    </ul>
  );
};

export default OrderWeekStatus;
