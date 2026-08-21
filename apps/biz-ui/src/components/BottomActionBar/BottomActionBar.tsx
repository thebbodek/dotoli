import clsx from 'clsx';

import {
  BOTTOM_ACTION_BAR_BASE_STYLE,
  BOTTOM_ACTION_BAR_BUTTON_STYLE,
  BOTTOM_ACTION_BAR_GAP_STYLES,
  BOTTOM_ACTION_BAR_INFO_STYLE,
  BOTTOM_ACTION_BAR_VARIANT_STYLES,
  BOTTOM_ACTION_BAR_VARIANTS,
} from '@/components/BottomActionBar/constants';
import { BottomActionBarProps } from '@/components/BottomActionBar/types';
import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
  CtaButton,
} from '@/components/Button';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const BottomActionBar = ({
  confirm,
  cancel,
  info,
  variant = BOTTOM_ACTION_BAR_VARIANTS.FLOATING,
  className,
}: BottomActionBarProps) => {
  return (
    <div
      className={clsx(
        className,
        BOTTOM_ACTION_BAR_BASE_STYLE,
        BOTTOM_ACTION_BAR_VARIANT_STYLES[variant],
        info
          ? BOTTOM_ACTION_BAR_GAP_STYLES.INFO
          : BOTTOM_ACTION_BAR_GAP_STYLES.DEFAULT,
      )}
    >
      {!!info && (
        <Typography
          className={BOTTOM_ACTION_BAR_INFO_STYLE}
          color={COLOR_VARIANTS.BLUE_600}
          variant={TYPOGRAPHY_VARIANTS.BODY_SEMIBOLD}
        >
          {info}
        </Typography>
      )}
      {!!cancel && (
        <CtaButton
          className={BOTTOM_ACTION_BAR_BUTTON_STYLE}
          label={cancel.label}
          size={CTA_BUTTON_SIZES.LG}
          theme={CTA_BUTTON_THEMES.GRAY}
          variant={CTA_BUTTON_VARIANTS.TONAL}
          onClick={cancel.onClick}
        />
      )}
      <CtaButton
        className={BOTTOM_ACTION_BAR_BUTTON_STYLE}
        label={confirm.label}
        size={CTA_BUTTON_SIZES.LG}
        theme={CTA_BUTTON_THEMES.PRIMARY}
        variant={CTA_BUTTON_VARIANTS.FILLED}
        onClick={confirm.onClick}
      />
    </div>
  );
};

export default BottomActionBar;
