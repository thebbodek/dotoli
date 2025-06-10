import { OverlayTitleProps } from '@/components/shared/components/Overlay/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const OverlayTitle = ({
  title,
  variant = TYPOGRAPHY_VARIANTS.HEADLINE_20_B,
  className,
}: OverlayTitleProps) => {
  return (
    <Typography as='strong' variant={variant} className={className}>
      {title}
    </Typography>
  );
};

export default OverlayTitle;
