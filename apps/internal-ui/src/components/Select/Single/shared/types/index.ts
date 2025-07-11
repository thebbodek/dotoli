import { HTMLAttributes } from 'react';

import {
  SelectBaseLabelProps,
  SelectBasePopoverWrapperProps,
  SelectBaseProps,
  SelectLabelContextValue,
} from '@/components/Select';
import { SelectBaseItemProps } from '@/components/Select/shared/types';

export type SelectValue = string | number | null;

export interface SingleSelectBaseProps<T extends SelectValue>
  extends Pick<
      SelectBaseProps,
      | 'className'
      | 'popoverOption'
      | 'disabled'
      | 'feedback'
      | 'required'
      | 'isError'
      | 'placeholder'
      | 'type'
    >,
    Pick<SingleSelectListContextValue<T>, 'onSelect' | 'value'>,
    Pick<SelectBaseLabelProps, 'badge'>,
    SingleSelectBaseTriggerProps {
  label: string;
  popoverWrapperClassName: SelectBasePopoverWrapperProps['className'];
}

export interface SingleSelectBaseTriggerProps {
  displayValue: SelectValue;
}

export interface SingleSelectListProviderProps<T extends SelectValue>
  extends SingleSelectListContextValue<T> {}

export interface SingleSelectOnSelectParams<T extends SelectValue> {
  value: T;
}

export interface SingleSelectListContextValue<T extends SelectValue>
  extends Required<Pick<HTMLAttributes<HTMLLIElement>, 'id'>> {
  labelId: SelectLabelContextValue['id'];
  close: () => void;
  onSelect: (params: SingleSelectOnSelectParams<T>) => void;
  value: T;
}

export interface SingleSelectBaseItemProps<T extends SelectValue>
  extends Pick<SingleSelectListContextValue<T>, 'value'>,
    Pick<SelectBaseItemProps, 'label'> {}
