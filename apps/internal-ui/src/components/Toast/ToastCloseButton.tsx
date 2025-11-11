import { IconButton } from '@/components/Button';
import { ToastProps } from '@/components/Toast/types';

const ToastCloseButton = ({ onClose }: Pick<ToastProps, 'onClose'>) => {
  return (
    <IconButton
      iconKey='x'
      aria-label='닫기'
      theme='white'
      className='-mr-2'
      onClick={onClose}
    />
  );
};

export default ToastCloseButton;
