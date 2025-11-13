import { OverlayDescriptionProps } from '@/components/shared/components/Overlay/types';
import { Typography } from '@/components/Typography';

const OverlayDescription = ({
  description,
  className,
}: OverlayDescriptionProps) => {
  return (
    <Typography
      as='p'
      className={className}
      color='gray-07'
      variant='body-16-r'
    >
      {description}
    </Typography>
  );
};

export default OverlayDescription;
