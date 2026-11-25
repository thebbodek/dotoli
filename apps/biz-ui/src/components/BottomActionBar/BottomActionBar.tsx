import clsx from 'clsx';

import {
  BOTTOM_ACTION_BAR_ACTION_DEFAULTS,
  BOTTOM_ACTION_BAR_BASE_STYLE,
  BOTTOM_ACTION_BAR_INFO_STYLE,
  BOTTOM_ACTION_BAR_LAYOUT_STYLES,
  BOTTOM_ACTION_BAR_VARIANT_STYLES,
  BOTTOM_ACTION_BAR_VARIANTS,
} from '@/components/BottomActionBar/constants';
import { BottomActionBarProps } from '@/components/BottomActionBar/types';
import {
  resolveBottomActionBarAction,
  resolveBottomActionBarGap,
} from '@/components/BottomActionBar/utils';
import { CtaButton } from '@/components/Button';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const BottomActionBar = ({
  action,
  subAction,
  info,
  variant = BOTTOM_ACTION_BAR_VARIANTS.FLOATING,
  isStacked = false,
  className,
  ref,
}: BottomActionBarProps) => {
  const { ACTION, SUB_ACTION, STACKED_SUB_ACTION } =
    BOTTOM_ACTION_BAR_ACTION_DEFAULTS;
  const actionProps = resolveBottomActionBarAction({
    action,
    defaultOption: ACTION,
    isStacked,
  });
  const subActionProps =
    subAction &&
    resolveBottomActionBarAction({
      action: subAction,
      defaultOption: isStacked ? STACKED_SUB_ACTION : SUB_ACTION,
      isStacked,
    });

  return (
    <div
      className={clsx(
        className,
        BOTTOM_ACTION_BAR_BASE_STYLE,
        BOTTOM_ACTION_BAR_VARIANT_STYLES[variant],
        isStacked
          ? BOTTOM_ACTION_BAR_LAYOUT_STYLES.STACKED
          : BOTTOM_ACTION_BAR_LAYOUT_STYLES.INLINE,
        resolveBottomActionBarGap({ isStacked, info }),
      )}
      ref={ref}
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
