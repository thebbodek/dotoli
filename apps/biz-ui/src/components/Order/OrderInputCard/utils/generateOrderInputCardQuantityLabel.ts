import {
  ORDER_INPUT_CARD_EMPTY_ITEM_LABEL,
  ORDER_INPUT_CARD_QUANTITY_UNIT,
} from '@/components/Order/OrderInputCard/constants';
import { GenerateOrderInputCardQuantityLabelProps } from '@/components/Order/OrderInputCard/types';

export const generateOrderInputCardQuantityLabel = ({
  quantity,
  quantityLabel,
}: GenerateOrderInputCardQuantityLabelProps) => {
  if (!quantity) return ORDER_INPUT_CARD_EMPTY_ITEM_LABEL;

  return quantityLabel ?? `${quantity}${ORDER_INPUT_CARD_QUANTITY_UNIT}`;
};
