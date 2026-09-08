import { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, RefAttributes } from 'react';

import { NavigationListItemOption } from '@/components/NavigationListItem/shared/types';

export interface LinkNavigationListItemProps
  extends NavigationListItemOption,
    LinkProps,
    Pick<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      'className' | 'rel' | 'target'
    >,
    RefAttributes<HTMLAnchorElement> {}
