import { HTMLAttributes } from 'react';

import { ORDER_BOX_CELL_TONES } from '@/components/Order/OrderBoxCell/constants';
import { ColorVariants } from '@/variants';

export type OrderBoxCellTone =
  (typeof ORDER_BOX_CELL_TONES)[keyof typeof ORDER_BOX_CELL_TONES];

export type OrderBoxCellToneStyles = Record<
  'BOXES' | 'ITEM_NAME',
  ColorVariants
>;

export interface OrderBoxCellProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  boxes: string;
  itemName: string;
  tone?: OrderBoxCellTone;
}
