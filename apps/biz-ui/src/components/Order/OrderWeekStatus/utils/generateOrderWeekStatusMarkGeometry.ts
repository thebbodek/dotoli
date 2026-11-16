import {
  ORDER_WEEK_STATUS_DASH_COUNT,
  ORDER_WEEK_STATUS_SLASH_RATIOS,
  ORDER_WEEK_STATUS_STROKE_WIDTH,
} from '@/components/Order/OrderWeekStatus/constants';
import { GenerateOrderWeekStatusMarkGeometryProps } from '@/components/Order/OrderWeekStatus/types';

export const generateOrderWeekStatusMarkGeometry = ({
  diameter,
}: GenerateOrderWeekStatusMarkGeometryProps) => {
  const center = diameter / 2;
  const strokeRadius = center - ORDER_WEEK_STATUS_STROKE_WIDTH / 2;
  const circumference = 2 * Math.PI * strokeRadius;
  const dashLength = circumference / (ORDER_WEEK_STATUS_DASH_COUNT * 2);

  return {
    center,
    fillRadius: center,
    strokeRadius,
    dashArray: `${dashLength} ${dashLength}`,
    slashStart: diameter * ORDER_WEEK_STATUS_SLASH_RATIOS.START,
    slashEnd: diameter * ORDER_WEEK_STATUS_SLASH_RATIOS.END,
  };
};
