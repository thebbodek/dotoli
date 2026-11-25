import { ORDER_BOX_QUANTITY_UNITS } from '@/components/Order/OrderBox/constants';
import { GenerateOrderBoxQuantityLabelProps } from '@/components/Order/OrderBox/types';

export const generateOrderBoxQuantityLabel = ({
  boxCount,
  unitCount,
}: GenerateOrderBoxQuantityLabelProps) => {
  const { BOX, UNIT } = ORDER_BOX_QUANTITY_UNITS;

  return `${boxCount}${BOX} (${unitCount}${UNIT})`;
};
