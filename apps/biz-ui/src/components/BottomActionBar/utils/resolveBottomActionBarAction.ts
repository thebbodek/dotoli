import { BOTTOM_ACTION_BAR_BUTTON_STYLES } from '@/components/BottomActionBar/constants';
import { ResolveBottomActionBarActionProps } from '@/components/BottomActionBar/types';
import { CTA_BUTTON_VARIANTS } from '@/components/Button';

export const resolveBottomActionBarAction = ({
  action,
  defaultOption,
  isStacked,
}: ResolveBottomActionBarActionProps) => {
  const variant = action.variant ?? defaultOption.variant;
  const { FILL, HUG, FULL } = BOTTOM_ACTION_BAR_BUTTON_STYLES;
  const inlineClassName = variant === CTA_BUTTON_VARIANTS.TEXT ? HUG : FILL;

  return {
    ...action,
    variant,
    theme: action.theme ?? defaultOption.theme,
    size: action.size ?? defaultOption.size,
    className: isStacked ? FULL : inlineClassName,
  };
};
