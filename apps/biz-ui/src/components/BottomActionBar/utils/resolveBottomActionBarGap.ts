import { BOTTOM_ACTION_BAR_GAP_STYLES } from '@/components/BottomActionBar/constants';
import { ResolveBottomActionBarGapProps } from '@/components/BottomActionBar/types';

export const resolveBottomActionBarGap = ({
  isStacked,
  info,
}: ResolveBottomActionBarGapProps) => {
  if (isStacked) return BOTTOM_ACTION_BAR_GAP_STYLES.STACKED;

  if (info) return BOTTOM_ACTION_BAR_GAP_STYLES.INFO;

  return BOTTOM_ACTION_BAR_GAP_STYLES.DEFAULT;
};
