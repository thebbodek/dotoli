import clsx from 'clsx';

import {
  ORDER_DATE_INFO_BASE_STYLE,
  ORDER_DATE_INFO_DAY_TYPE_SUFFIXES,
  ORDER_DATE_INFO_DAY_TYPES,
  ORDER_DATE_INFO_DESCRIPTION_COLOR,
  ORDER_DATE_INFO_SIZES,
  ORDER_DATE_INFO_THEMES,
  ORDER_DATE_INFO_TITLE_COLORS,
  ORDER_DATE_INFO_TITLE_STYLE,
  ORDER_DATE_INFO_TITLE_VARIANTS,
  ORDER_DATE_INFO_TITLE_WITH_DESCRIPTION_STYLE,
} from '@/components/Order/OrderDateInfo/constants';
import { OrderDateInfoProps } from '@/components/Order/OrderDateInfo/types';
import { Typography, TYPOGRAPHY_ELEMENTS } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderDateInfo = ({
  title,
  description,
  theme = ORDER_DATE_INFO_THEMES.DEFAULT,
  size = ORDER_DATE_INFO_SIZES.MD,
  dayType = ORDER_DATE_INFO_DAY_TYPES.WEEKDAY,
  className,
}: OrderDateInfoProps) => {
  const suffix = ORDER_DATE_INFO_DAY_TYPE_SUFFIXES[dayType];

  return (
    <div className={clsx(className, ORDER_DATE_INFO_BASE_STYLE)}>
      {!!title && (
        <Typography
          className={clsx(
            ORDER_DATE_INFO_TITLE_STYLE,
            !!description && ORDER_DATE_INFO_TITLE_WITH_DESCRIPTION_STYLE,
          )}
          as={TYPOGRAPHY_ELEMENTS.P}
          color={ORDER_DATE_INFO_TITLE_COLORS[theme]}
          variant={ORDER_DATE_INFO_TITLE_VARIANTS[size]}
        >
          <span>{title}</span>
          {!!suffix && <span>{suffix}</span>}
        </Typography>
      )}
      {!!description && (
        <Typography
          as={TYPOGRAPHY_ELEMENTS.P}
          color={ORDER_DATE_INFO_DESCRIPTION_COLOR}
          variant={TYPOGRAPHY_VARIANTS.LABEL}
        >
          {description}
        </Typography>
      )}
    </div>
  );
};

export default OrderDateInfo;
