import {
  ORDER_BOX_EMPTY_LABEL,
  ORDER_BOX_LIST_STYLES,
} from '@/components/Order/OrderBox/constants';
import OrderBoxList from '@/components/Order/OrderBox/OrderBoxList';
import { OrderBoxProps } from '@/components/Order/OrderBox/types';
import { Typography, TYPOGRAPHY_ELEMENTS } from '@/components/Typography';

const OrderBox = ({
  items,
  emptyLabel = ORDER_BOX_EMPTY_LABEL,
  className,
}: OrderBoxProps) => {
  const { ITEM_NAME } = ORDER_BOX_LIST_STYLES;

  if (!items.length) {
    return (
      <Typography
        as={TYPOGRAPHY_ELEMENTS.P}
        className={className}
        color={ITEM_NAME.COLOR}
        variant={ITEM_NAME.VARIANT}
      >
        {emptyLabel}
      </Typography>
    );
  }

  return (
    <OrderBoxList
      className={className}
      items={items}
      styles={ORDER_BOX_LIST_STYLES}
    />
  );
};

export default OrderBox;
