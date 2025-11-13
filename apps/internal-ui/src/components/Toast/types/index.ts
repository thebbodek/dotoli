import { ReactNode } from 'react';

import { ActionButtonProps } from '@/components/shared';
import { TOAST_TYPES } from '@/components/Toast/constants';

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];

export interface ToastProps {
  visible: boolean;
  content: ReactNode;
  type?: ToastType;
  onClose: () => void;
  useClose?: boolean;
  actionOption?: Pick<
    ActionButtonProps,
    'label' | 'as' | 'linkOption' | 'buttonOption'
  >;
}

export interface ToastActionButtonProps
  extends Required<Pick<ToastProps, 'actionOption'>> {}
