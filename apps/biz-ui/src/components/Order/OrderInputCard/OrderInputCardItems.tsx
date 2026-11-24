import {
  ORDER_INPUT_CARD_ITEM_STYLE,
  ORDER_INPUT_CARD_ITEM_STYLES,
  ORDER_INPUT_CARD_ITEMS_STYLE,
} from '@/components/Order/OrderInputCard/constants';
import { OrderInputCardItemsProps } from '@/components/Order/OrderInputCard/types';
import { generateOrderInputCardQuantityLabel } from '@/components/Order/OrderInputCard/utils';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OrderInputCardItems = ({ items }: OrderInputCardItemsProps) => {
  const { ORDERED, EMPTY } = ORDER_INPUT_CARD_ITEM_STYLES;

  return (
    <div className={ORDER_INPUT_CARD_ITEMS_STYLE}>
      {items.map(({ name, quantity, quantityLabel }) => {
        const color = quantity ? ORDERED : EMPTY;

        return (
          <div className={ORDER_INPUT_CARD_ITEM_STYLE} key={name}>
            <Typography color={color} variant={TYPOGRAPHY_VARIANTS.BODY}>
              {name}
            </Typography>
            <Typography color={color} variant={TYPOGRAPHY_VARIANTS.BODY_BOLD}>
              {generateOrderInputCardQuantityLabel({ quantity, quantityLabel })}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

export default OrderInputCardItems;
