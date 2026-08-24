import { BOTTOM_ACTION_BAR_BUTTON_STYLES } from '@/components/BottomActionBar/constants';
import { ResolveBottomActionBarActionProps } from '@/components/BottomActionBar/types';
import { CTA_BUTTON_VARIANTS } from '@/components/Button';

export const resolveBottomActionBarAction = ({
  action,
  defaultOption,
}: ResolveBottomActionBarActionProps) => {
  const variant = action.variant ?? defaultOption.variant;

  return {
    ...action,
    variant,
    theme: action.theme ?? defaultOption.theme,
    size: action.size ?? defaultOption.size,
    className:
      variant === CTA_BUTTON_VARIANTS.TEXT
        ? BOTTOM_ACTION_BAR_BUTTON_STYLES.HUG
        : BOTTOM_ACTION_BAR_BUTTON_STYLES.FILL,
  };
};
