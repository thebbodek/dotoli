import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import {
  ORDER_WEEK_STATUS_CHECK_ICON_KEY,
  ORDER_WEEK_STATUS_CHECK_ICON_STYLE,
  ORDER_WEEK_STATUS_CHECK_ICON_WEIGHT,
  ORDER_WEEK_STATUS_DASHED_STROKE_STYLES,
  ORDER_WEEK_STATUS_DAY_STATUSES,
  ORDER_WEEK_STATUS_MARK_BASE_STYLE,
  ORDER_WEEK_STATUS_MARK_SPECS,
  ORDER_WEEK_STATUS_NO_ORDER_MARK,
  ORDER_WEEK_STATUS_NO_ORDER_MARK_COLOR,
  ORDER_WEEK_STATUS_NO_ORDER_MARK_STYLE,
  ORDER_WEEK_STATUS_ORDERED_MARK_STYLE,
  ORDER_WEEK_STATUS_STROKE_WIDTH,
  ORDER_WEEK_STATUS_SUSPENDED_FILL_STYLE,
  ORDER_WEEK_STATUS_SUSPENDED_SLASH_STYLE,
  ORDER_WEEK_STATUS_SVG_MARK_STYLE,
} from '@/components/Order/OrderWeekStatus/constants';
import { OrderWeekStatusMarkProps } from '@/components/Order/OrderWeekStatus/types';
import { generateOrderWeekStatusMarkGeometry } from '@/components/Order/OrderWeekStatus/utils';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderWeekStatusMark = ({ status, size }: OrderWeekStatusMarkProps) => {
  const { BOX, DIAMETER } = ORDER_WEEK_STATUS_MARK_SPECS[size];

  if (status === ORDER_WEEK_STATUS_DAY_STATUSES.ORDERED) {
    return (
      <span
        className={clsx(
          ORDER_WEEK_STATUS_MARK_BASE_STYLE,
          BOX,
          ORDER_WEEK_STATUS_ORDERED_MARK_STYLE,
        )}
      >
        <Icon
          className={ORDER_WEEK_STATUS_CHECK_ICON_STYLE}
          iconKey={ORDER_WEEK_STATUS_CHECK_ICON_KEY}
          weight={ORDER_WEEK_STATUS_CHECK_ICON_WEIGHT}
        />
      </span>
    );
  }

  if (status === ORDER_WEEK_STATUS_DAY_STATUSES.NO_ORDER) {
    return (
      <span className={clsx(ORDER_WEEK_STATUS_MARK_BASE_STYLE, BOX)}>
        <Typography
          className={ORDER_WEEK_STATUS_NO_ORDER_MARK_STYLE}
          color={ORDER_WEEK_STATUS_NO_ORDER_MARK_COLOR}
          variant={TYPOGRAPHY_VARIANTS.HEADING_5}
        >
          {ORDER_WEEK_STATUS_NO_ORDER_MARK}
        </Typography>
      </span>
    );
  }

  const { center, fillRadius, strokeRadius, dashArray, slashStart, slashEnd } =
    generateOrderWeekStatusMarkGeometry({ diameter: DIAMETER });

  return (
    <svg
      className={ORDER_WEEK_STATUS_SVG_MARK_STYLE}
      height={DIAMETER}
      viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}
      width={DIAMETER}
    >
      {status === ORDER_WEEK_STATUS_DAY_STATUSES.SUSPENDED ? (
        <>
          <circle
            className={ORDER_WEEK_STATUS_SUSPENDED_FILL_STYLE}
            cx={center}
            cy={center}
            r={fillRadius}
          />
          <line
            className={ORDER_WEEK_STATUS_SUSPENDED_SLASH_STYLE}
            strokeLinecap='round'
            strokeWidth={ORDER_WEEK_STATUS_STROKE_WIDTH}
            x1={slashStart}
            x2={slashEnd}
            y1={slashEnd}
            y2={slashStart}
          />
        </>
      ) : (
        <circle
          className={ORDER_WEEK_STATUS_DASHED_STROKE_STYLES[status]}
          cx={center}
          cy={center}
          fill='none'
          r={strokeRadius}
          strokeDasharray={dashArray}
          strokeWidth={ORDER_WEEK_STATUS_STROKE_WIDTH}
        />
      )}
    </svg>
  );
};

export default OrderWeekStatusMark;
