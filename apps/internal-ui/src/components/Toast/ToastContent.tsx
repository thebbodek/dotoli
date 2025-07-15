import { ToastProps } from '@/components/Toast/types';
import { Typography } from '@/components/Typography';

const ToastContent = ({ content }: Pick<ToastProps, 'content'>) => {
  return (
    <Typography as='p' variant='body-14-m' color='white'>
      {content}
    </Typography>
  );
};

export default ToastContent;
