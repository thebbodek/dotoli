import clsx from 'clsx';

import {
  ORDER_DATE_INFO_BASE_STYLE,
  ORDER_DATE_INFO_HOLIDAY_SUFFIX,
  ORDER_DATE_INFO_NO_DELIVERY_LABEL,
  ORDER_DATE_INFO_STYLES,
} from '@/components/Order/OrderDateInfo/constants';
import { OrderDateInfoProps } from '@/components/Order/OrderDateInfo/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderDateInfo = ({
  dateLabel,
  deliveryInfo,
  isHoliday = false,
  className,
}: OrderDateInfoProps) => {
  const { DATE, HOLIDAY_DATE, DELIVERY, NO_DELIVERY } = ORDER_DATE_INFO_STYLES;
  const hasDelivery = !!deliveryInfo;

  return (
    <div className={clsx(className, ORDER_DATE_INFO_BASE_STYLE)}>
      <Typography
        className='-mb-0.5'
        color={isHoliday ? HOLIDAY_DATE : DATE}
        variant={TYPOGRAPHY_VARIANTS.BODY_LG_SEMIBOLD}
      >
        {isHoliday
          ? `${dateLabel} ${ORDER_DATE_INFO_HOLIDAY_SUFFIX}`
          : dateLabel}
      </Typography>
      <Typography
        color={hasDelivery ? DELIVERY : NO_DELIVERY}
        variant={TYPOGRAPHY_VARIANTS.BODY}
      >
        {hasDelivery ? deliveryInfo : ORDER_DATE_INFO_NO_DELIVERY_LABEL}
      </Typography>
    </div>
  );
};

export default OrderDateInfo;
