import { ButtonHTMLAttributes, RefAttributes } from 'react';

import { ORDER_NOTI_COLLAPSE_TYPES } from '@/components/Order/OrderNotiCollapse/constants';
import { ColorVariants } from '@/variants';

export type OrderNotiCollapseType =
  (typeof ORDER_NOTI_COLLAPSE_TYPES)[keyof typeof ORDER_NOTI_COLLAPSE_TYPES];

export interface OrderNotiCollapseTypeStyles {
  CONTAINER: string;
  LABEL: ColorVariants;
}

export interface OrderNotiCollapseProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'aria-controls'
    >,
    Required<Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>>,
    RefAttributes<HTMLButtonElement> {
  type: OrderNotiCollapseType;
  registeredAtLabel: string;
  registrant: string;
  isOpen: boolean;
}
