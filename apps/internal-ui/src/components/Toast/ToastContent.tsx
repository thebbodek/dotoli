import { ToastProps } from '@/components/Toast/types';
import { Typography } from '@/components/Typography';

const ToastContent = ({ content }: Pick<ToastProps, 'content'>) => {
  return (
    <Typography as='p' color='white' variant='body-14-m'>
      {content}
    </Typography>
  );
};

export default ToastContent;
