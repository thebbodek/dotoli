import { OverlayDescriptionProps } from '@/components/shared/components/Overlay/types';
import { Typography } from '@/components/Typography';

const OverlayDescription = ({
  description,
  className,
}: OverlayDescriptionProps) => {
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

export default OverlayDescription;
