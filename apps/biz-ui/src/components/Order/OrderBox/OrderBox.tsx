import clsx from 'clsx';

import {
  ORDER_BOX_BASE_STYLE,
  ORDER_BOX_EMPTY_LABEL,
  ORDER_BOX_EMPTY_LABEL_COLOR,
  ORDER_BOX_EMPTY_STYLE,
  ORDER_BOX_ITEM_STYLE,
  ORDER_BOX_ITEMS_STYLE,
  ORDER_BOX_STYLES,
  ORDER_BOX_VARIANTS,
} from '@/components/Order/OrderBox/constants';
import { OrderBoxProps } from '@/components/Order/OrderBox/types';
import { OrderBoxCell } from '@/components/Order/OrderBoxCell';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderBox = ({
  items,
  variant = ORDER_BOX_VARIANTS.DEFAULT,
  emptyLabel = ORDER_BOX_EMPTY_LABEL,
  className,
}: OrderBoxProps) => {
  const { CONTAINER, TONE } = ORDER_BOX_STYLES[variant];
  const isEmpty = !items.length;

  return (
    <div
      className={clsx(
        className,
        ORDER_BOX_BASE_STYLE,
        isEmpty ? ORDER_BOX_EMPTY_STYLE : [CONTAINER, ORDER_BOX_ITEMS_STYLE],
      )}
    >
      {isEmpty ? (
        <Typography
          color={ORDER_BOX_EMPTY_LABEL_COLOR}
          variant={TYPOGRAPHY_VARIANTS.LABEL}
        >
          {emptyLabel}
        </Typography>
      ) : (
        items.map(({ boxes, itemName }) => (
          <OrderBoxCell
            boxes={boxes}
            className={ORDER_BOX_ITEM_STYLE}
            itemName={itemName}
            key={itemName}
            tone={TONE}
          />
        ))
      )}
    </div>
  );
};

export default OrderBox;
