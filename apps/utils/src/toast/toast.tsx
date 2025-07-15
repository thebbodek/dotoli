import { Toast, TOAST_TYPES, ToastProps } from '@bbodek/internal-ui';
import { default as _toast, Toast as ReactHotToast } from 'react-hot-toast';

import { CreateToastOption, ToastOption } from '@/toast/types';

const createToast = ({
  useClose,
  duration = 3000,
  onClose,
  ...props
}: CreateToastOption) => {
  const handleClose = ({ id }: Pick<ReactHotToast, 'id'>) => {
    if (!useClose) return;

    _toast.dismiss(id);
    onClose?.();
  };

  return _toast.custom(
    (t) => (
      <Toast
        visible={t.visible}
        useClose={useClose}
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

const toast = {
  info,
  success,
  warning,
  error,
};

export default toast;
