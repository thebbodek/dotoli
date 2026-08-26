import clsx from 'clsx';

import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
  CtaButton,
  ICON_BUTTON_SIZES,
  IconButton,
} from '@/components/Button';
import { ICON_CIRCLE_SIZES, IconCircle } from '@/components/IconCircle';
import {
  TOAST_BASE_STYLE,
  TOAST_DEFAULT_ROLE,
  TOAST_DISMISS_ARIA_LABEL,
  TOAST_DISMISS_ICON_KEY,
  TOAST_HIGHLIGHT_STYLES,
  TOAST_ICON_THEMES,
  TOAST_LOADING_ICON_KEY,
  TOAST_LOADING_ICON_STYLE,
  TOAST_MESSAGE_STYLE,
  TOAST_STATUSES,
} from '@/components/Toast/constants';
import { ToastProps } from '@/components/Toast/types';
import { Typography, TYPOGRAPHY_ELEMENTS } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const Toast = ({
  message,
  status = TOAST_STATUSES.INFO,
  iconKey,
  weight,
  theme,
  action,
  className,
  role = TOAST_DEFAULT_ROLE,
  'aria-live': ariaLive,
  onDismiss,
}: ToastProps) => {
  const isLoading = status === TOAST_STATUSES.LOADING;
  const resolvedIconKey = isLoading ? TOAST_LOADING_ICON_KEY : iconKey;
  const resolvedTheme = isLoading || !theme ? TOAST_ICON_THEMES[status] : theme;

  const messageClassName = clsx(
    TOAST_MESSAGE_STYLE,
    TOAST_HIGHLIGHT_STYLES[resolvedTheme],
  );

  return (
    <div
      aria-live={ariaLive}
      className={clsx(className, TOAST_BASE_STYLE)}
      role={role}
    >
      {!!resolvedIconKey && (
        <IconCircle
          iconClassName={clsx(isLoading && TOAST_LOADING_ICON_STYLE)}
          iconKey={resolvedIconKey}
          size={ICON_CIRCLE_SIZES.SM}
          theme={resolvedTheme}
          weight={weight}
        />
      )}
      <Typography
        as={TYPOGRAPHY_ELEMENTS.P}
        className={messageClassName}
        color={COLOR_VARIANTS.WHITE}
        variant={TYPOGRAPHY_VARIANTS.BODY}
      >
        {message}
      </Typography>
      {!!action && (
        <CtaButton
          label={action.label}
          size={CTA_BUTTON_SIZES.SM}
          theme={CTA_BUTTON_THEMES.PRIMARY}
          variant={CTA_BUTTON_VARIANTS.FILLED}
          onClick={action.onClick}
        />
      )}
      {!!onDismiss && (
        <IconButton
          aria-label={TOAST_DISMISS_ARIA_LABEL}
          iconKey={TOAST_DISMISS_ICON_KEY}
          size={ICON_BUTTON_SIZES.SM}
          onClick={onDismiss}
        />
      )}
    </div>
  );
};

export default Toast;
