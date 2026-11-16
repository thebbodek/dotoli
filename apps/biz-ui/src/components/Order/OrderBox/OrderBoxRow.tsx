import {
  ORDER_BOX_ITEM_NAME_COLOR,
  ORDER_BOX_ITEM_NAME_STYLE,
  ORDER_BOX_QUANTITY_COLOR,
  ORDER_BOX_QUANTITY_STYLE,
  ORDER_BOX_ROW_STYLE,
} from '@/components/Order/OrderBox/constants';
import { OrderBoxRowProps } from '@/components/Order/OrderBox/types';
import { Typography, TYPOGRAPHY_ELEMENTS } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderBoxRow = ({ itemName, quantity }: OrderBoxRowProps) => {
  return (
    <div className={ORDER_BOX_ROW_STYLE}>
      <Typography
        as={TYPOGRAPHY_ELEMENTS.DT}
        className={ORDER_BOX_ITEM_NAME_STYLE}
        color={ORDER_BOX_ITEM_NAME_COLOR}
        variant={TYPOGRAPHY_VARIANTS.LABEL_SEMIBOLD}
      >
        {itemName}
      </Typography>
      <Typography
        as={TYPOGRAPHY_ELEMENTS.DD}
        className={ORDER_BOX_QUANTITY_STYLE}
        color={ORDER_BOX_QUANTITY_COLOR}
        variant={TYPOGRAPHY_VARIANTS.LABEL}
      >
        {quantity}
      </Typography>
    </div>
  );
};

export default OrderBoxRow;
