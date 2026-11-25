import clsx from 'clsx';

import {
  ORDER_BOX_EMPTY_LABEL,
  ORDER_BOX_VARIANT_STYLES,
  ORDER_BOX_VARIANTS,
} from '@/components/Order/OrderBox/constants';
import OrderBoxList from '@/components/Order/OrderBox/OrderBoxList';
import { OrderBoxProps } from '@/components/Order/OrderBox/types';
import { Typography, TYPOGRAPHY_ELEMENTS } from '@/components/Typography';

const OrderBox = ({
  items,
  emptyLabel = ORDER_BOX_EMPTY_LABEL,
  variant = ORDER_BOX_VARIANTS.LIST,
  className,
}: OrderBoxProps) => {
  const { CONTAINER, EMPTY, LIST, EMPTY_LABEL } =
    ORDER_BOX_VARIANT_STYLES[variant];

  if (!items.length) {
    return (
      <Typography
        as={TYPOGRAPHY_ELEMENTS.P}
        className={clsx(className, EMPTY)}
        color={EMPTY_LABEL.COLOR}
        variant={EMPTY_LABEL.VARIANT}
      >
        {emptyLabel}
      </Typography>
    );
  }

  return (
    <OrderBoxList
      className={clsx(className, CONTAINER)}
      items={items}
      styles={LIST}
    />
  );
};

export default OrderBox;
