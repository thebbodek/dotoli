import { OrderBoxItem } from '@/components/Order/OrderBox';
import { GenerateOrderInputCardItemsProps } from '@/components/Order/OrderInputCard/types';
import { generateOrderInputCardQuantityLabel } from '@/components/Order/OrderInputCard/utils/generateOrderInputCardQuantityLabel';

export const generateOrderInputCardItems = ({
  items,
}: GenerateOrderInputCardItemsProps): OrderBoxItem[] =>
  items.map(({ name, quantity, quantityLabel }) => ({
    itemName: name,
    quantity: generateOrderInputCardQuantityLabel({ quantity, quantityLabel }),
    isNoOrder: !quantity,
  }));
