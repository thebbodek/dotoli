import clsx from 'clsx';

import {
  ORDER_BOX_BASE_STYLE,
  ORDER_BOX_EMPTY_LABEL,
  ORDER_BOX_EMPTY_LABEL_COLOR,
} from '@/components/Order/OrderBox/constants';
import OrderBoxRow from '@/components/Order/OrderBox/OrderBoxRow';
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
        className={className}
        color={ORDER_BOX_EMPTY_LABEL_COLOR}
        variant={TYPOGRAPHY_VARIANTS.LABEL_SEMIBOLD}
      >
        {emptyLabel}
      </Typography>
    );
  }

  return (
    <dl className={clsx(className, ORDER_BOX_BASE_STYLE)}>
      {items.map(({ itemName, quantity }) => (
        <OrderBoxRow itemName={itemName} key={itemName} quantity={quantity} />
      ))}
    </dl>
  );
};

export default OrderBox;
