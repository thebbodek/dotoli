import clsx from 'clsx';

import {
  ORDER_BOX_EMPTY_LABEL,
  ORDER_BOX_EMPTY_LABEL_COLOR,
  ORDER_BOX_EMPTY_STYLE,
  ORDER_BOX_STYLE,
} from '@/components/Order/OrderBox/constants';
import OrderBoxList from '@/components/Order/OrderBox/OrderBoxList';
import { OrderBoxProps } from '@/components/Order/OrderBox/types';
import { Typography, TYPOGRAPHY_ELEMENTS } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderBox = ({
  items,
  emptyLabel = ORDER_BOX_EMPTY_LABEL,
  className,
}: OrderBoxProps) => {
  if (!items.length) {
    return (
      <Typography
        as={TYPOGRAPHY_ELEMENTS.P}
        className={clsx(className, ORDER_BOX_EMPTY_STYLE)}
        color={ORDER_BOX_EMPTY_LABEL_COLOR}
        variant={TYPOGRAPHY_VARIANTS.LABEL}
      >
        {emptyLabel}
      </Typography>
    );
  }

  return (
    <OrderBoxList className={clsx(className, ORDER_BOX_STYLE)} items={items} />
  );
};

export default OrderBox;
