import { ModalTitleProps } from '@/components/Modal/Modal/types';
import { Typography } from '@/components/Typography';

const ModalTitle = ({ title, className }: ModalTitleProps) => {
  return (
    <Typography
      as='strong'
      variant='headline-20-b'
      color='gray-08'
      className={className}
    >
      {title}
    </Typography>
  );
};

export default ModalTitle;
