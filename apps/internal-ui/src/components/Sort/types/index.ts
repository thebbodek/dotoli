import { HTMLAttributes } from 'react';

import {
  SelectValue,
  SingleSelectBaseItemProps,
  SingleSelectBaseProps,
  SingleSelectOnSelectParams,
} from '@/components/Select';

export type SortValue = SelectValue;

export interface SortProps
  extends Pick<
    SingleSelectBaseProps<SortValue>,
    | 'value'
    | 'disabled'
    | 'popoverOption'
    | 'onSelect'
    | 'displayValue'
    | 'className'
    | 'label'
  > {}

export interface SortOnSelectParams<T extends SortValue>
  extends SingleSelectOnSelectParams<T> {}

export interface SortTriggerProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<SortProps, 'displayValue'> {}

export interface SortItemProps<T extends SortValue>
  extends Pick<SingleSelectBaseItemProps<T>, 'value' | 'label'> {}
