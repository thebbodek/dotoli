import { ModalDescriptionProps } from '@/components/Modal/Modal/types';
import { Typography } from '@/components/Typography';

const ModalDescription = ({
  description,
  className,
}: ModalDescriptionProps) => {
  return (
    <Typography
      as='p'
      variant='body-16-r'
      color='gray-07'
      className={className}
    >
      {description}
    </Typography>
  );
};

export default ModalDescription;
