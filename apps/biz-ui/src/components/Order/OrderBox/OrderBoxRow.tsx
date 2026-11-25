import {
  ORDER_BOX_ITEM_NAME_STYLE,
  ORDER_BOX_QUANTITY_STYLE,
  ORDER_BOX_ROW_STYLE,
} from '@/components/Order/OrderBox/constants';
import { OrderBoxRowProps } from '@/components/Order/OrderBox/types';
import { Typography, TYPOGRAPHY_ELEMENTS } from '@/components/Typography';

const OrderBoxRow = ({
  itemName,
  quantity,
  isNoOrder = false,
  styles,
}: OrderBoxRowProps) => {
  const { ITEM_NAME, QUANTITY, NO_ORDER_COLOR } = styles;
  const noOrderColor = isNoOrder ? NO_ORDER_COLOR : undefined;

  return (
    <div className={ORDER_BOX_ROW_STYLE}>
      <Typography
        as={TYPOGRAPHY_ELEMENTS.DT}
        className={ORDER_BOX_ITEM_NAME_STYLE}
        color={noOrderColor ?? ITEM_NAME.COLOR}
        variant={ITEM_NAME.VARIANT}
      >
        {itemName}
      </Typography>
      <Typography
        as={TYPOGRAPHY_ELEMENTS.DD}
        className={ORDER_BOX_QUANTITY_STYLE}
        color={noOrderColor ?? QUANTITY.COLOR}
        variant={QUANTITY.VARIANT}
      >
        {quantity}
      </Typography>
    </div>
  );
};

export default OrderBoxRow;
