import { Toast, TOAST_TYPES, ToastProps } from '@bbodek/internal-ui';
import { default as toastBase, ToastOptions } from 'react-hot-toast';

import { CreateToastOption, ToastOption } from '@/toast/types';

const { dismiss, dismissAll, custom } = toastBase;

const createToast = ({
  id,
  toasterId,
  duration = 2000,
  useClose,
  onClose,
  ...props
}: CreateToastOption) => {
  const handleClose = ({ id }: Pick<ToastOptions, 'id'>) => {
    if (!useClose) return;

    dismiss(id);
    onClose?.();
  };

  return custom(
    (t) => (
      <Toast
        useClose={useClose}
        visible={t.visible}
        onClose={() => handleClose({ id: t.id })}
        {...props}
      />
    ),
    {
      position: 'top-center',
      duration,
      ariaProps: {
        role: 'alert',
        'aria-live': 'assertive',
      },
      id,
      toasterId,
    },
  );
};

const info = (content: ToastProps['content'], option?: ToastOption) =>
  createToast({ type: TOAST_TYPES.INFO, content, ...option });

const success = (content: ToastProps['content'], option?: ToastOption) =>
  createToast({ type: TOAST_TYPES.SUCCESS, content, ...option });

const warning = (content: ToastProps['content'], option?: ToastOption) =>
  createToast({ type: TOAST_TYPES.WARNING, content, ...option });

const error = (content: ToastProps['content'], option?: ToastOption) =>
  createToast({ type: TOAST_TYPES.ERROR, content, ...option });

export const toast = {
  info,
  success,
  warning,
  error,
  dismiss,
  dismissAll,
};
