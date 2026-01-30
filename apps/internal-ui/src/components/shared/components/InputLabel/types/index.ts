import { LabelHTMLAttributes, ReactNode } from 'react';

import { TypographyProps } from '@/components/Typography';

export interface InputLabelProps
  extends Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>,
    Pick<TypographyProps<'span'>, 'id' | 'className'> {
  hidden?: boolean;
  badge?: ReactNode;
  required?: boolean;
}

export interface InputLabelWrapperProps
  extends Pick<InputLabelProps, 'badge'>,
    Pick<LabelHTMLAttributes<HTMLLabelElement>, 'className' | 'htmlFor'> {}

export interface InputLabelTextProps
  extends Omit<InputLabelProps, 'htmlFor' | 'hidden' | 'badge'> {}
