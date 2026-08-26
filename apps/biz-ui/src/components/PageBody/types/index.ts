import { HTMLAttributes } from 'react';

import { PAGE_BODY_VARIANTS } from '@/components/PageBody/constants';

export type PageBodyVariant =
  (typeof PAGE_BODY_VARIANTS)[keyof typeof PAGE_BODY_VARIANTS];

export interface PageBodyProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  variant?: PageBodyVariant;
}
