import { InfoPopoverDescriptionProps } from '@/components/InfoPopover/types';
import { Typography } from '@/components/Typography';

const InfoPopoverDescription = ({
  description,
  className,
}: InfoPopoverDescriptionProps) => {
  return (
    <Typography as='p' variant='body-12-m' color='black' className={className}>
      {description}
    </Typography>
  );
};

export default InfoPopoverDescription;
