import clsx from 'clsx';

import { CTA_BUTTON_SIZES, CtaButton } from '@/components/Button/CtaButton';
import OrderBoxList from '@/components/Order/OrderBox/OrderBoxList';
import {
  ORDER_DATE_INFO_DAY_TYPES,
  OrderDateInfo,
} from '@/components/Order/OrderDateInfo';
import {
  ORDER_INPUT_CARD_ACTION_LABELS,
  ORDER_INPUT_CARD_BASE_STYLE,
  ORDER_INPUT_CARD_BUTTON_STYLES,
  ORDER_INPUT_CARD_DATE_INFO_STYLE,
  ORDER_INPUT_CARD_DAY_STYLE,
  ORDER_INPUT_CARD_ITEMS_BACKGROUNDS,
  ORDER_INPUT_CARD_ITEMS_STYLE,
  ORDER_INPUT_CARD_ORDER_STATUSES,
  ORDER_INPUT_CARD_ROW_STYLE,
  ORDER_INPUT_CARD_STYLES,
  ORDER_INPUT_CARD_SUMMARY_STYLE,
} from '@/components/Order/OrderInputCard/constants';
import { OrderInputCardProps } from '@/components/Order/OrderInputCard/types';
import {
  resolveOrderInputCardAppearance,
  resolveOrderInputCardDayStyle,
} from '@/components/Order/OrderInputCard/utils';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderInputCard = ({
  orderStatus,
  dayLabel,
  dateLabel,
  description,
  isLocked = false,
  dayType = ORDER_DATE_INFO_DAY_TYPES.WEEKDAY,
  items,
  onAction,
  className,
}: OrderInputCardProps) => {
  const appearance = resolveOrderInputCardAppearance({
    orderStatus,
    isLocked,
  });
  const { CARD, DATE_INFO_THEME } = ORDER_INPUT_CARD_STYLES[appearance];
  const { CONTAINER, LABEL } = resolveOrderInputCardDayStyle({
    appearance,
    dayType,
  });
  const buttonStyle = ORDER_INPUT_CARD_BUTTON_STYLES[orderStatus];
  const hasItems =
    orderStatus === ORDER_INPUT_CARD_ORDER_STATUSES.ORDERED && !!items?.length;

  return (
    <div className={clsx(className, ORDER_INPUT_CARD_BASE_STYLE, CARD)}>
      <div className={ORDER_INPUT_CARD_ROW_STYLE}>
        <div className={ORDER_INPUT_CARD_SUMMARY_STYLE}>
          <span className={clsx(ORDER_INPUT_CARD_DAY_STYLE, CONTAINER)}>
            <Typography color={LABEL} variant={TYPOGRAPHY_VARIANTS.BODY_BOLD}>
              {dayLabel}
            </Typography>
          </span>
          <OrderDateInfo
            className={ORDER_INPUT_CARD_DATE_INFO_STYLE}
            dayType={dayType}
            description={description}
            theme={DATE_INFO_THEME}
            title={dateLabel}
          />
        </div>
        {!isLocked && (
          <CtaButton
            label={ORDER_INPUT_CARD_ACTION_LABELS[orderStatus]}
            size={CTA_BUTTON_SIZES.SM}
            theme={buttonStyle.theme}
            variant={buttonStyle.variant}
            onClick={onAction}
          />
        )}
      </div>
      {hasItems && (
        <OrderBoxList
          className={clsx(
            ORDER_INPUT_CARD_ITEMS_STYLE,
            isLocked
              ? ORDER_INPUT_CARD_ITEMS_BACKGROUNDS.LOCKED
              : ORDER_INPUT_CARD_ITEMS_BACKGROUNDS.DEFAULT,
          )}
          isMuted={isLocked}
          items={items}
        />
      )}
    </div>
  );
};

export default OrderInputCard;
