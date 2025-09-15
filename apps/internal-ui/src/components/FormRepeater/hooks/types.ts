import { UseFormReturnType } from '@bbodek/hooks';

import { FormRepeaterListItemOnResetParams } from '@/components/FormRepeater/types';

export type UseFormRepeaterValue<T extends object> = T & { id: string };

export type UseFormRepeaterValuesType<T extends object, I extends object> = {
  [K in keyof T]: UseFormRepeaterValue<I>[];
};

export interface UseFormRepeaterProps<T extends object, I extends object>
  extends Pick<UseFormReturnType<T>, 'setValues'> {
  key: keyof T;
  values: UseFormRepeaterValue<I>[];
  originalValues?: UseFormRepeaterValue<I>[];
  initialValue: I;
}

export interface UseFormRepeaterChangedValue<T extends object> {
  originalValue: UseFormRepeaterValue<T> | null;
  value: UseFormRepeaterValue<T>;
}

export interface UseFormRepeaterChangedValues<T extends object> {
  [id: string]: UseFormRepeaterChangedValue<T> | undefined;
}

export interface UseFormRepeaterOnChangeParams<T extends object>
  extends Pick<UseFormRepeaterValue<T>, 'id'> {
  key: keyof T;
  value: T[keyof T];
}

export interface UseFormRepeaterOnDeleteParams<T extends object>
  extends Pick<UseFormRepeaterValue<T>, 'id'> {}

export interface UseFormRepeaterOnResetParams<T extends object>
  extends Pick<UseFormRepeaterValue<T>, 'id'>,
    FormRepeaterListItemOnResetParams<T> {}
