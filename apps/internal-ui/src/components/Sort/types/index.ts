import { HTMLAttributes } from 'react';

import {
  SelectValue,
  SingleSelectBaseItemProps,
  SingleSelectBaseProps,
} from '@/components/Select';

export type SortValue = Extract<SelectValue, string | null>;

export interface SortProps
  extends Pick<
    SingleSelectBaseProps<SortValue>,
    | 'value'
    | 'disabled'
    | 'popoverOption'
    | 'onSelect'
    | 'displayValue'
    | 'className'
  > {}

export interface SortTriggerProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<SortProps, 'displayValue'> {}

export interface SortItemProps
  extends Pick<SingleSelectBaseItemProps<SortValue>, 'value'> {}
