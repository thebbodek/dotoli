import { ReactNode } from 'react';

import {
  CalendarContextProviderProps,
  CalendarContextValue,
  CalendarProps,
  CalendarValue,
} from '@/components/Calendar';
import { InputBaseProps } from '@/components/Input';
import {
  SelectBaseChildrenProps,
  SelectBaseLabelProps,
  SelectBaseProps,
} from '@/components/Select';

export interface DatePickerProps
  extends Pick<
      DatePickerWrapperProps,
      | 'disabled'
      | 'feedback'
      | 'required'
      | 'isError'
      | 'placeholder'
      | 'className'
      | 'popoverOption'
    >,
    Pick<SelectBaseLabelProps, 'label' | 'badge'>,
    Pick<InputBaseProps, 'hiddenLabel'>,
    CalendarProps,
    CalendarContextProviderProps {}

export interface DatePickerWrapperProps
  extends Pick<
    SelectBaseProps,
    | 'disabled'
    | 'feedback'
    | 'required'
    | 'isError'
    | 'placeholder'
    | 'className'
    | 'type'
    | 'controls'
    | 'labelId'
    | 'children'
    | 'popoverOption'
  > {
  label: ReactNode;
}

export interface DatePickerSelectButtonProps
  extends Pick<SelectBaseChildrenProps, 'close'>,
    Pick<DatePickerProps, 'disabled'> {}

export interface IsValidDateOfVariantParams
  extends Pick<CalendarContextProviderProps, 'variant'> {
  value: CalendarContextValue['internalValue'] | CalendarValue;
}
