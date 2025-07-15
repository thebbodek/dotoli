import clsx from 'clsx';

import { Flex } from '@/components/Flex';
import { TOAST_TYPES } from '@/components/Toast/constants';
import ToastActionButton from '@/components/Toast/ToastActionButton';
import ToastCloseButton from '@/components/Toast/ToastCloseButton';
import ToastContent from '@/components/Toast/ToastContent';
import ToastIcon from '@/components/Toast/ToastIcon';
import { ToastProps } from '@/components/Toast/types';

const Toast = ({
  visible,
  type = TOAST_TYPES.INFO,
  content,
  useClose = false,
  actionOption,
  onClose,
}: ToastProps) => {
  return (
    <div
      className={clsx(
        'bg-in-gray-09 in-flex-h-stack shadow-in-8 rounded-in-8 min-h-11 max-w-full shrink-0 flex-wrap items-center overflow-hidden px-4 py-1.5 md:min-w-[21.25rem]',
        visible ? 'animate-in-toast-in' : 'animate-in-toast-out',
      )}
    >
      <Flex align={{ items: 'center' }} gap={{ row: 2 }}>
        <ToastIcon type={type} />
        <ToastContent content={content} />
      </Flex>
      <Flex
        align={{ items: 'center' }}
        gap={{ row: 1 }}
        className='ml-auto pl-4'
      >
        {actionOption && <ToastActionButton actionOption={actionOption} />}
        {useClose && <ToastCloseButton onClose={onClose} />}
      </Flex>
    </div>
  );
};

export default Toast;
