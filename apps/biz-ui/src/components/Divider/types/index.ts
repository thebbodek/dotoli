import { HTMLAttributes } from 'react';

import { DIVIDER_TYPES } from '@/components/Divider/constants';

export type DividerType = (typeof DIVIDER_TYPES)[keyof typeof DIVIDER_TYPES];

export type DividerCaretType = (typeof DIVIDER_TYPES)['UP' | 'DOWN'];

export interface DividerProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  type?: DividerType;
  label?: string;
}
