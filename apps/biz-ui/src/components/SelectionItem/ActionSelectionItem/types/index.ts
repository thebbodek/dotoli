import { ButtonHTMLAttributes, RefAttributes } from 'react';

import { SelectionItemOption } from '@/components/SelectionItem/shared/types';

export interface ActionSelectionItemProps
  extends SelectionItemOption,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>,
    Required<Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>>,
    RefAttributes<HTMLButtonElement> {
  isSelected: boolean;
}
