import { IconButton } from '@/components/Button';
import { ToastProps } from '@/components/Toast/types';

const ToastCloseButton = ({ onClose }: Pick<ToastProps, 'onClose'>) => {
  return (
    <IconButton
      aria-label='닫기'
      className='-mr-2'
      iconKey='x'
      theme='white'
      onClick={onClose}
    />
  );
};

export default ToastCloseButton;
