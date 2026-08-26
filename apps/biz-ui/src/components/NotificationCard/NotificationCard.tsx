import clsx from 'clsx';

import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
  CtaButton,
} from '@/components/Button';
import { ICON_WEIGHTS } from '@/components/Icon';
import { IconCircle } from '@/components/IconCircle';
import {
  NOTIFICATION_CARD_BASE_STYLE,
  NOTIFICATION_CARD_COLORS,
  NOTIFICATION_CARD_DEFAULT_THEME,
  NOTIFICATION_CARD_HEADER_STYLE,
  NOTIFICATION_CARD_HIGHLIGHT_STYLES,
  NOTIFICATION_CARD_HISTORY_DIVIDER_STYLE,
  NOTIFICATION_CARD_HISTORY_STYLE,
  NOTIFICATION_CARD_TEXT_STYLE,
} from '@/components/NotificationCard/constants';
import { NotificationCardProps } from '@/components/NotificationCard/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const NotificationCard = ({
  iconKey,
  theme = NOTIFICATION_CARD_DEFAULT_THEME,
  title,
  subText,
  history,
  period,
  actionLabel,
  onAction,
  className,
}: NotificationCardProps) => {
  const hasText = !!title || !!subText || !!history;

  return (
    <div className={clsx(className, NOTIFICATION_CARD_BASE_STYLE)}>
      {(!!iconKey || hasText) && (
        <div className={NOTIFICATION_CARD_HEADER_STYLE}>
          {!!iconKey && (
            <IconCircle
              iconKey={iconKey}
              theme={theme}
              weight={ICON_WEIGHTS.FILL}
            />
          )}
          {hasText && (
            <div className={NOTIFICATION_CARD_TEXT_STYLE}>
              {!!title && (
                <Typography
                  className={NOTIFICATION_CARD_HIGHLIGHT_STYLES[theme]}
                  color={NOTIFICATION_CARD_COLORS.TITLE}
                  variant={TYPOGRAPHY_VARIANTS.HEADING_4}
                >
                  {title}
                </Typography>
              )}
              {!!subText && (
                <Typography
                  color={NOTIFICATION_CARD_COLORS.SUB_TEXT}
                  variant={TYPOGRAPHY_VARIANTS.BODY}
                >
                  {subText}
                </Typography>
              )}
              {!!history && (
                <div className={NOTIFICATION_CARD_HISTORY_STYLE}>
                  <Typography
                    color={NOTIFICATION_CARD_COLORS.HISTORY_TIME}
                    variant={TYPOGRAPHY_VARIANTS.LABEL}
                  >
                    {history.registeredAt}
                  </Typography>
                  <span className={NOTIFICATION_CARD_HISTORY_DIVIDER_STYLE} />
                  <Typography
                    color={NOTIFICATION_CARD_COLORS.HISTORY_REGISTRANT}
                    variant={TYPOGRAPHY_VARIANTS.LABEL}
                  >
                    {history.registrant}
                  </Typography>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {!!period && (
        <Typography
          color={NOTIFICATION_CARD_COLORS.PERIOD}
          variant={TYPOGRAPHY_VARIANTS.LABEL}
        >
          {period}
        </Typography>
      )}
      {!!actionLabel && (
        <CtaButton
          label={actionLabel}
          size={CTA_BUTTON_SIZES.SM}
          theme={CTA_BUTTON_THEMES.GRAY}
          variant={CTA_BUTTON_VARIANTS.OUTLINED}
          onClick={onAction}
        />
      )}
    </div>
  );
};

export default NotificationCard;
