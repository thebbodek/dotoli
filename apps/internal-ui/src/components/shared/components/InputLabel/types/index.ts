import { LabelHTMLAttributes, ReactNode } from 'react';

export interface InputLabelProps
  extends Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> {
  badge?: ReactNode;
  required?: boolean;
}
