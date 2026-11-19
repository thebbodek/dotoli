import {
  CTA_BUTTON_LABEL_STACK_STYLE,
  CTA_BUTTON_UNDERLINE_STYLE,
} from '@/components/Button/CtaButton/constants';
import { CtaButtonLabelProps } from '@/components/Button/CtaButton/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const CtaButtonLabel = ({
  label,
  description,
  useUnderline = false,
}: CtaButtonLabelProps) => {
  const labelElement = (
    <span className={useUnderline ? CTA_BUTTON_UNDERLINE_STYLE : undefined}>
      {label}
    </span>
  );

  if (!description) {
    return labelElement;
  }

  return (
    <span className={CTA_BUTTON_LABEL_STACK_STYLE}>
      {labelElement}
      <Typography variant={TYPOGRAPHY_VARIANTS.LABEL_SEMIBOLD}>
        {description}
      </Typography>
    </span>
  );
};

export default CtaButtonLabel;
