import clsx from 'clsx';

import {
  SELECTION_ITEM_BASE_STYLE,
  SELECTION_ITEM_STATE_STYLES,
  SELECTION_ITEM_STATES,
} from '@/components/SelectionItem/shared/constants';
import { GenerateSelectionItemStyleProps } from '@/components/SelectionItem/shared/types';

export const generateSelectionItemStyle = ({
  isSelected,
  className,
}: GenerateSelectionItemStyleProps) =>
  clsx(
    className,
    SELECTION_ITEM_BASE_STYLE,
    SELECTION_ITEM_STATE_STYLES[
      isSelected
        ? SELECTION_ITEM_STATES.SELECTED
        : SELECTION_ITEM_STATES.DEFAULT
    ],
  );
