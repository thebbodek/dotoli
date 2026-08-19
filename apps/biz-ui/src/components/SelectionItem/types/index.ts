import { InputHTMLAttributes, RefAttributes } from 'react';

import { SELECTION_ITEM_STATES } from '@/components/SelectionItem/constants';

export type SelectionItemState =
  (typeof SELECTION_ITEM_STATES)[keyof typeof SELECTION_ITEM_STATES];

export interface SelectionItemProps
  extends Pick<
      InputHTMLAttributes<HTMLInputElement>,
      'className' | 'id' | 'name' | 'value'
    >,
    Required<
      Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>
    >,
    RefAttributes<HTMLInputElement> {
  label: string;
}
