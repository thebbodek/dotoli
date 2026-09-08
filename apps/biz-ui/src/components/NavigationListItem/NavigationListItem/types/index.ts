import { ButtonHTMLAttributes } from 'react';

import { NavigationListItemOption } from '@/components/NavigationListItem/shared/types';

export interface NavigationListItemProps
  extends NavigationListItemOption,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>,
    Required<Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>> {}
