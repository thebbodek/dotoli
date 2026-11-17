import clsx from 'clsx';

import { Badge, BADGE_THEMES, BADGE_VARIANTS } from '@/components/Badge';
import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
  CtaButton,
} from '@/components/Button/CtaButton';
import {
  ORDER_DATE_INFO_BASE_STYLE,
  ORDER_DATE_INFO_DATE_STYLE,
  ORDER_DATE_INFO_STYLES,
  ORDER_DATE_INFO_TRAILING_STYLE,
} from '@/components/Order/OrderDateInfo/constants';
import { OrderDateInfoProps } from '@/components/Order/OrderDateInfo/types';
import { ORDER_DEADLINE_PASSED_LABEL } from '@/components/Order/shared';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderDateInfo = ({
  dateLabel,
  isHoliday = false,
  deadlineLabel,
  action,
  isDeadlinePassed = false,
  className,
}: OrderDateInfoProps) => {
  const { DATE, HOLIDAY_DATE, DEADLINE } = ORDER_DATE_INFO_STYLES;
  const hasTrailing = isDeadlinePassed || !!deadlineLabel || !!action;

  return (
    <div className={clsx(className, ORDER_DATE_INFO_BASE_STYLE)}>
      <Typography
        className={ORDER_DATE_INFO_DATE_STYLE}
        color={isHoliday ? HOLIDAY_DATE : DATE}
        variant={TYPOGRAPHY_VARIANTS.HEADING_5}
      >
        {dateLabel}
      </Typography>
      {hasTrailing && (
        <div className={ORDER_DATE_INFO_TRAILING_STYLE}>
          {isDeadlinePassed && (
            <Badge
              label={ORDER_DEADLINE_PASSED_LABEL}
              theme={BADGE_THEMES.GRAY}
              variant={BADGE_VARIANTS.TONAL}
            />
          )}
          {!isDeadlinePassed && !!deadlineLabel && (
            <Typography
              color={DEADLINE}
              variant={TYPOGRAPHY_VARIANTS.LABEL_SEMIBOLD}
            >
              {deadlineLabel}
            </Typography>
          )}
          {!isDeadlinePassed && !!action && (
            <CtaButton
              label={action.label}
              size={CTA_BUTTON_SIZES.SM}
              theme={CTA_BUTTON_THEMES.GRAY}
              variant={CTA_BUTTON_VARIANTS.TONAL}
              onClick={action.onClick}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDateInfo;
