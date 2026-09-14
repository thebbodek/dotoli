import { HTMLAttributes } from 'react';

import { SELECTION_ITEM_STATES } from '@/components/SelectionItem/shared/constants';

export type SelectionItemState =
  (typeof SELECTION_ITEM_STATES)[keyof typeof SELECTION_ITEM_STATES];

export interface SelectionItemOption {
  label: string;
}

export interface SelectionItemContentProps extends SelectionItemOption {
  isSelected: boolean;
}

export interface GenerateSelectionItemStyleProps
  extends Pick<SelectionItemContentProps, 'isSelected'>,
    Pick<HTMLAttributes<HTMLElement>, 'className'> {}
