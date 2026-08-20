import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import {
  STATUS_ALERT_BANNER_ACTION_LABEL,
  STATUS_ALERT_BANNER_ACTION_STYLE,
  STATUS_ALERT_BANNER_BASE_STYLE,
  STATUS_ALERT_BANNER_CONTENT_STYLE,
  STATUS_ALERT_BANNER_DISMISS_ARIA_LABEL,
  STATUS_ALERT_BANNER_DISMISS_ICON_KEY,
  STATUS_ALERT_BANNER_DISMISS_ICON_STYLE,
  STATUS_ALERT_BANNER_DISMISS_ICON_WEIGHT,
  STATUS_ALERT_BANNER_DISMISS_STYLE,
  STATUS_ALERT_BANNER_ICON_STYLE,
  STATUS_ALERT_BANNER_ICON_WEIGHT,
  STATUS_ALERT_BANNER_MESSAGE_STYLE,
  STATUS_ALERT_BANNER_STYLES,
  STATUS_ALERT_BANNER_TAIL_STYLE,
  STATUS_ALERT_BANNER_THEMES,
} from '@/components/StatusAlertBanner/constants';
import { StatusAlertBannerProps } from '@/components/StatusAlertBanner/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const StatusAlertBanner = ({
  message,
  theme = STATUS_ALERT_BANNER_THEMES.PRIMARY,
  className,
  role,
  'aria-live': ariaLive,
  onAction,
  onDismiss,
}: StatusAlertBannerProps) => {
  const { ICON_KEY, ICON } = STATUS_ALERT_BANNER_STYLES[theme];

  return (
    <div
      aria-live={ariaLive}
      className={clsx(className, STATUS_ALERT_BANNER_BASE_STYLE)}
      role={role}
    >
      <span className={STATUS_ALERT_BANNER_TAIL_STYLE} aria-hidden />
      <span className={STATUS_ALERT_BANNER_CONTENT_STYLE}>
        <Icon
          className={clsx(STATUS_ALERT_BANNER_ICON_STYLE, ICON)}
          iconKey={ICON_KEY}
          weight={STATUS_ALERT_BANNER_ICON_WEIGHT}
          aria-hidden
        />
        <Typography
          className={STATUS_ALERT_BANNER_MESSAGE_STYLE}
          color={COLOR_VARIANTS.WHITE}
          variant={TYPOGRAPHY_VARIANTS.LABEL_BOLD}
        >
          {message}
        </Typography>
      </span>
      {!!onAction && (
        <button
          className={STATUS_ALERT_BANNER_ACTION_STYLE}
          type='button'
          onClick={onAction}
        >
          {STATUS_ALERT_BANNER_ACTION_LABEL}
        </button>
      )}
      {!!onDismiss && (
        <button
          aria-label={STATUS_ALERT_BANNER_DISMISS_ARIA_LABEL}
          className={STATUS_ALERT_BANNER_DISMISS_STYLE}
          type='button'
          onClick={onDismiss}
        >
          <Icon
            className={STATUS_ALERT_BANNER_DISMISS_ICON_STYLE}
            iconKey={STATUS_ALERT_BANNER_DISMISS_ICON_KEY}
            weight={STATUS_ALERT_BANNER_DISMISS_ICON_WEIGHT}
            aria-hidden
          />
        </button>
      )}
    </div>
  );
};

export default StatusAlertBanner;
