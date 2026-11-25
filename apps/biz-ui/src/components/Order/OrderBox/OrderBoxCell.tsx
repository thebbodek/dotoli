import {
  ORDER_BOX_CELL_COLORS,
  ORDER_BOX_CELL_STATES,
  ORDER_BOX_CELL_STYLE,
  ORDER_BOX_NO_ORDER_LABEL,
  ORDER_BOX_PACKAGE_NAME_STYLE,
  ORDER_BOX_QUANTITY_STYLE,
} from '@/components/Order/OrderBox/constants';
import { OrderBoxCellProps } from '@/components/Order/OrderBox/types';
import {
  generateOrderBoxQuantityLabel,
  resolveOrderBoxCellState,
} from '@/components/Order/OrderBox/utils';
import { Typography, TYPOGRAPHY_ELEMENTS } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderBoxCell = ({
  packageName,
  boxCount,
  unitCount,
  isMuted = false,
}: OrderBoxCellProps) => {
  const state = resolveOrderBoxCellState({ boxCount, isMuted });
  const color = ORDER_BOX_CELL_COLORS[state];
  const quantity =
    state === ORDER_BOX_CELL_STATES.EMPTY
      ? ORDER_BOX_NO_ORDER_LABEL
      : generateOrderBoxQuantityLabel({ boxCount, unitCount });

  return (
    <div className={ORDER_BOX_CELL_STYLE}>
      <Typography
        as={TYPOGRAPHY_ELEMENTS.DT}
        className={ORDER_BOX_PACKAGE_NAME_STYLE}
        color={color}
        variant={TYPOGRAPHY_VARIANTS.BODY}
      >
        {packageName}
      </Typography>
      <Typography
        as={TYPOGRAPHY_ELEMENTS.DD}
        className={ORDER_BOX_QUANTITY_STYLE}
        color={color}
        variant={TYPOGRAPHY_VARIANTS.BODY_BOLD}
      >
        {quantity}
      </Typography>
    </div>
  );
};

export default OrderBoxCell;
