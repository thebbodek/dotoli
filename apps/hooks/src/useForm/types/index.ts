import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export type ValueKey<T> = keyof T & string;
export type UseFormErrors = { [key: string]: string };

export interface Props<T> {
  initialValues: T;
  validate?: (fields: T) => UseFormErrors;
}

export interface UseFormHandleChangeParams {
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
}

export interface UseFormReturnType<T> {
  values: T;
  setValues: Dispatch<SetStateAction<T>>;
  errors: UseFormErrors;
  handleChange: (event: UseFormHandleChangeParams['event']) => void;
  setErrors: Dispatch<SetStateAction<UseFormErrors>>;
}
