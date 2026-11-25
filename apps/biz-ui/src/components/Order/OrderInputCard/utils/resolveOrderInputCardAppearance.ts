import {
  ORDER_INPUT_CARD_APPEARANCES,
  ORDER_INPUT_CARD_ORDER_STATUSES,
} from '@/components/Order/OrderInputCard/constants';
import { ResolveOrderInputCardAppearanceProps } from '@/components/Order/OrderInputCard/types';

export const resolveOrderInputCardAppearance = ({
  orderStatus,
  isLocked,
}: ResolveOrderInputCardAppearanceProps) => {
  if (isLocked || orderStatus === ORDER_INPUT_CARD_ORDER_STATUSES.ZERO) {
    return ORDER_INPUT_CARD_APPEARANCES.MUTED;
  }

  return orderStatus;
};
