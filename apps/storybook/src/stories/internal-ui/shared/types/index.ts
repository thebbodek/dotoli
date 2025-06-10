import { UseFormReturnType } from '@bbodek/hooks';

export interface FormContentFields {
  date: string | null;
  input: string | null;
  title: string | null;
  input1: string | null;
  input2: string | null;
  description: string | null;
}

export interface FormContentProps
  extends Pick<
    UseFormReturnType<FormContentFields>,
    'values' | 'handleChange'
  > {}
