import { ToastProps } from '@bbodek/internal-ui';
import { ToastOptions } from 'react-hot-toast';

export interface CreateToastOption
  extends Omit<ToastProps, 'visible' | 'onClose'>,
    Partial<Pick<ToastProps, 'onClose'>>,
    Pick<ToastOptions, 'duration'> {}

export interface ToastOption
  extends Omit<CreateToastOption, 'type' | 'content'> {}
