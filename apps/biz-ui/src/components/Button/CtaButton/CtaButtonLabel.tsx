import { CTA_BUTTON_LABEL_STACK_STYLE } from '@/components/Button/CtaButton/constants';
import { CtaButtonLabelProps } from '@/components/Button/CtaButton/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const CtaButtonLabel = ({ label, description }: CtaButtonLabelProps) => {
  if (!description) {
    return label;
  }

  return (
    <span className={CTA_BUTTON_LABEL_STACK_STYLE}>
      <span>{label}</span>
      <Typography variant={TYPOGRAPHY_VARIANTS.LABEL_SEMIBOLD}>
        {description}
      </Typography>
    </span>
  );
};

export default CtaButtonLabel;
