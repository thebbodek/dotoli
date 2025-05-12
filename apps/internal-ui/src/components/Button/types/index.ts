import { HTMLAttributes } from 'react';

export interface ButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'content'> {
  content: string;
}
