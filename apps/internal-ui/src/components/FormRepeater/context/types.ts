import { RefObject } from 'react';

import { FormRepeaterHeaderContentProps } from '@/components/FormRepeater/types';
import { ChildrenElement } from '@/components/shared';

export interface FormRepeaterContextProps {
  listRef: RefObject<HTMLUListElement | null>;
  columns: ChildrenElement<FormRepeaterHeaderContentProps>[];
  disabled?: boolean;
}

export interface FormRepeaterProviderProps extends FormRepeaterContextProps {}

export interface FormRepeaterListContextProps {
  itemsCount: number;
}

export interface FormRepeaterListProviderProps
  extends FormRepeaterListContextProps {}

export interface FormRepeaterListItemContentContextProps {
  column: ChildrenElement<FormRepeaterHeaderContentProps>;
}

export interface FormRepeaterListItemContentProviderProps
  extends FormRepeaterListItemContentContextProps {}
