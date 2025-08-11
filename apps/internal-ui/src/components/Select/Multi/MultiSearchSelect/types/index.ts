import { ReactNode } from 'react';

import { ChipProps } from '@/components/Chip';
import {
  MultiSelectBaseListItemProps,
  MultiSelectBaseProps,
  MultiSelectBaseProviderProps,
  MultiSelectBaseResultPanelProps,
  MultiSelectBaseValue,
} from '@/components/Select/Multi/shared';
import {
  SelectBaseChildrenProps,
  SelectBaseLabelProps,
  SelectBaseProps,
  SelectTriggerContextValue,
} from '@/components/Select/shared';

export interface MultiSearchSelectProps<T extends MultiSelectBaseValue>
  extends Pick<MultiSelectBaseProps, 'inputOption'>,
    Pick<MultiSelectBaseProviderProps<T>, 'options' | 'value' | 'onChange'>,
    Pick<SelectBaseLabelProps, 'badge'>,
    Pick<SelectBaseProps, 'label'>,
    Omit<MultiSearchSelectWrapperProps, 'label'> {}

export interface MultiSearchSelectWrapperProps
  extends Pick<
      SelectBaseProps,
      | 'disabled'
      | 'feedback'
      | 'required'
      | 'isError'
      | 'placeholder'
      | 'className'
      | 'controls'
      | 'labelId'
      | 'children'
      | 'popoverOption'
    >,
    Pick<SelectBaseProps, 'children'> {
  label: ReactNode;
}

export interface MultiSearchSelectListHeaderProps
  extends Pick<MultiSelectBaseResultPanelProps, 'count'> {}

export interface MultiSearchSelectListItemProps<T extends MultiSelectBaseValue>
  extends Omit<MultiSelectBaseListItemProps<T>, 'className' | 'label'> {
  label: string;
}

export interface MultiSearchSelectSelectedPanelProps
  extends Pick<MultiSearchSelectListHeaderProps, 'count'> {}

export interface MultiSearchSelectSelectedListItemProps<
  T extends MultiSelectBaseValue,
> extends Pick<MultiSearchSelectListItemProps<T>, 'optionKey'>,
    Pick<ChipProps, 'label'> {}

export interface MultiSearchSelectButtonProps
  extends Pick<SelectBaseChildrenProps, 'close'> {}

export interface MultiSearchSelectOverflowCountProps
  extends Pick<SelectTriggerContextValue, 'disabled'> {
  count: number;
}
