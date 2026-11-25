import clsx from 'clsx';

import { Badge, BADGE_VARIANTS } from '@/components/Badge';
import { CTA_BUTTON_SIZES, CtaButton } from '@/components/Button/CtaButton';
import OrderBoxList from '@/components/Order/OrderBox/OrderBoxList';
import {
  ORDER_INPUT_CARD_ACTION_LABELS,
  ORDER_INPUT_CARD_BADGE_THEMES,
  ORDER_INPUT_CARD_BASE_STYLE,
  ORDER_INPUT_CARD_BUTTON_STYLES,
  ORDER_INPUT_CARD_DAY_STYLE,
  ORDER_INPUT_CARD_ITEMS_STYLE,
  ORDER_INPUT_CARD_ORDER_STATUSES,
  ORDER_INPUT_CARD_ROW_STYLE,
  ORDER_INPUT_CARD_STATUS_LABEL_COLOR,
  ORDER_INPUT_CARD_STATUS_LABELS,
  ORDER_INPUT_CARD_STYLES,
  ORDER_INPUT_CARD_SUMMARY_STYLE,
  ORDER_INPUT_CARD_TEXT_STYLE,
} from '@/components/Order/OrderInputCard/constants';
import { OrderInputCardProps } from '@/components/Order/OrderInputCard/types';
import {
  generateOrderInputCardDateLabel,
  resolveOrderInputCardDayStyle,
} from '@/components/Order/OrderInputCard/utils';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderInputCard = ({
  orderStatus,
  dayLabel,
  dateLabel,
  isHoliday = false,
  statusLabel,
  badgeLabel,
  badgeTheme = ORDER_INPUT_CARD_BADGE_THEMES.RED,
  items,
  onAction,
  className,
}: OrderInputCardProps) => {
  const { CARD, DATE } = ORDER_INPUT_CARD_STYLES[orderStatus];
  const { CONTAINER, LABEL } = resolveOrderInputCardDayStyle({
    orderStatus,
    isHoliday,
  });

  const actionLabel = ORDER_INPUT_CARD_ACTION_LABELS[orderStatus];
  const buttonStyle = ORDER_INPUT_CARD_BUTTON_STYLES[orderStatus];
  const status = statusLabel ?? ORDER_INPUT_CARD_STATUS_LABELS[orderStatus];
  const date = generateOrderInputCardDateLabel({ dateLabel, isHoliday });
  const hasItems =
    orderStatus === ORDER_INPUT_CARD_ORDER_STATUSES.COMPLETED &&
    !!items?.length;

  return (
    <div className={clsx(className, ORDER_INPUT_CARD_BASE_STYLE, CARD)}>
      <div className={ORDER_INPUT_CARD_ROW_STYLE}>
        <div className={ORDER_INPUT_CARD_SUMMARY_STYLE}>
          <span className={clsx(ORDER_INPUT_CARD_DAY_STYLE, CONTAINER)}>
            <Typography color={LABEL} variant={TYPOGRAPHY_VARIANTS.BODY_BOLD}>
              {dayLabel}
            </Typography>
          </span>
          <div className={ORDER_INPUT_CARD_TEXT_STYLE}>
            {!!date && (
              <Typography
                color={DATE}
                variant={TYPOGRAPHY_VARIANTS.BODY_SEMIBOLD}
              >
                {date}
              </Typography>
            )}
            {!!status && (
              <Typography
                color={ORDER_INPUT_CARD_STATUS_LABEL_COLOR}
                variant={TYPOGRAPHY_VARIANTS.LABEL}
              >
                {status}
              </Typography>
            )}
          </div>
        </div>
        {buttonStyle ? (
          <CtaButton
            label={actionLabel}
            size={CTA_BUTTON_SIZES.SM}
            theme={buttonStyle.theme}
            variant={buttonStyle.variant}
            onClick={onAction}
          />
        ) : (
          <Badge
            label={badgeLabel ?? actionLabel}
            theme={badgeTheme}
            variant={BADGE_VARIANTS.TONAL}
          />
        )}
      </div>
      {hasItems && (
        <OrderBoxList className={ORDER_INPUT_CARD_ITEMS_STYLE} items={items} />
      )}
    </div>
  );
};

export default OrderInputCard;
