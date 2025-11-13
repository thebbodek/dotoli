import { InfoPopoverDescriptionProps } from '@/components/InfoPopover/types';
import { Typography } from '@/components/Typography';

const InfoPopoverDescription = ({
  description,
  className,
}: InfoPopoverDescriptionProps) => {
  return (
    <Typography as='p' className={className} color='black' variant='body-12-m'>
      {description}
    </Typography>
  );
};

export default InfoPopoverDescription;
