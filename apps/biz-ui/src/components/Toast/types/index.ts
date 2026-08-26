import { HTMLAttributes, ReactNode } from 'react';

import { CtaButtonProps } from '@/components/Button';
import { IconCircleProps } from '@/components/IconCircle';
import { TOAST_STATUSES } from '@/components/Toast/constants';

export type ToastStatus = (typeof TOAST_STATUSES)[keyof typeof TOAST_STATUSES];

export interface ToastAction
  extends Required<Pick<CtaButtonProps, 'label' | 'onClick'>> {}

export interface ToastProps
  extends Pick<
      HTMLAttributes<HTMLDivElement>,
      'className' | 'role' | 'aria-live'
    >,
    Partial<Pick<IconCircleProps, 'iconKey' | 'weight' | 'theme'>> {
  message: ReactNode;
  status?: ToastStatus;
  action?: ToastAction;
  onDismiss?: () => void;
}
