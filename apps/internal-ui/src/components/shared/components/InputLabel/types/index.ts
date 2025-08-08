import { LabelHTMLAttributes, ReactNode } from 'react';

import { TypographyProps } from '@/components/Typography';

export interface InputLabelProps
  extends Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>,
    Pick<TypographyProps<'span'>, 'id' | 'className' | 'hidden'> {
  badge?: ReactNode;
  required?: boolean;
}

export interface InputLabelTextProps extends Omit<InputLabelProps, 'htmlFor'> {}
