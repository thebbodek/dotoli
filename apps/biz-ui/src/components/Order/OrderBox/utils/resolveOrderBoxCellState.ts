import { ORDER_BOX_CELL_STATES } from '@/components/Order/OrderBox/constants';
import { ResolveOrderBoxCellStateProps } from '@/components/Order/OrderBox/types';

export const resolveOrderBoxCellState = ({
  boxCount,
  isMuted,
}: ResolveOrderBoxCellStateProps) => {
  if (!boxCount) return ORDER_BOX_CELL_STATES.EMPTY;

  if (isMuted) return ORDER_BOX_CELL_STATES.MUTED;

  return ORDER_BOX_CELL_STATES.DEFAULT;
};
