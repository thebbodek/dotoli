import { HTMLAttributes } from 'react';

import { FormRepeaterContextProps } from '@/components/FormRepeater/context/types';
import {
  UseFormRepeaterChangedValue,
  UseFormRepeaterValue,
} from '@/components/FormRepeater/hooks';

export interface FormRepeaterProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Partial<Pick<FormRepeaterContextProps, 'disabled'>> {
  changedRowsCount?: number;
  onAdd?: () => void;
  onAllReset?: () => void;
}

export interface FormRepeaterHeaderContentProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  required?: boolean;
  label: string;
}

export interface FormRepeaterListItemProps<T extends object>
  extends Pick<FormRepeaterListItemActionsContentProps, 'onDelete'> {
  changedValue: UseFormRepeaterChangedValue<T> | undefined;
  onReset?: (props: FormRepeaterListItemOnResetParams<T>) => void;
}

export interface FormRepeaterListItemOnResetParams<T extends object> {
  originalValue: UseFormRepeaterValue<T>;
}

export interface FormRepeaterListItemActionsContentProps {
  isChanged: boolean;
  isAdded: boolean;
  onDelete?: () => void;
  onReset?: () => void;
}

export interface FormRepeaterListItemContentProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface FormRepeaterFooterProps
  extends Required<
    Pick<FormRepeaterProps, 'changedRowsCount' | 'onAllReset' | 'disabled'>
  > {}
