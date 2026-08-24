import clsx from 'clsx';

import {
  BOTTOM_ACTION_BAR_ACTION_DEFAULTS,
  BOTTOM_ACTION_BAR_BASE_STYLE,
  BOTTOM_ACTION_BAR_GAP_STYLES,
  BOTTOM_ACTION_BAR_INFO_STYLE,
  BOTTOM_ACTION_BAR_VARIANT_STYLES,
  BOTTOM_ACTION_BAR_VARIANTS,
} from '@/components/BottomActionBar/constants';
import { BottomActionBarProps } from '@/components/BottomActionBar/types';
import { resolveBottomActionBarAction } from '@/components/BottomActionBar/utils';
import { CtaButton } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const BottomActionBar = ({
  action,
  subAction,
  info,
  variant = BOTTOM_ACTION_BAR_VARIANTS.FLOATING,
  className,
}: BottomActionBarProps) => {
  const actionProps = resolveBottomActionBarAction({
    action,
    defaultOption: BOTTOM_ACTION_BAR_ACTION_DEFAULTS.ACTION,
  });
  const subActionProps =
    subAction &&
    resolveBottomActionBarAction({
      action: subAction,
      defaultOption: BOTTOM_ACTION_BAR_ACTION_DEFAULTS.SUB_ACTION,
    });

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
      {!!subActionProps && <CtaButton {...subActionProps} />}
      <CtaButton {...actionProps} />
    </div>
  );
};

export default BottomActionBar;
