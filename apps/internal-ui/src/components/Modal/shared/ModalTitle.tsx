import { ModalTitleProps } from '@/components/Modal/shared/types';
import { Typography } from '@/components/Typography';

const ModalTitle = ({ title, className }: ModalTitleProps) => {
  return (
    <Typography as='strong' variant='headline-20-b' className={className}>
      {title}
    </Typography>
  );
};

export default ModalTitle;
