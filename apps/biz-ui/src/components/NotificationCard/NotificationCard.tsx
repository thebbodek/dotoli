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
  NOTIFICATION_CARD_META_DIVIDER_STYLE,
  NOTIFICATION_CARD_META_STYLE,
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
  meta,
  period,
  actionLabel,
  onAction,
  className,
}: NotificationCardProps) => {
  const hasText = !!title || !!subText || !!meta?.text;

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
              {!!meta?.text && (
                <div className={NOTIFICATION_CARD_META_STYLE}>
                  <Typography
                    color={NOTIFICATION_CARD_COLORS.META_TEXT}
                    variant={TYPOGRAPHY_VARIANTS.LABEL}
                  >
                    {meta.text}
                  </Typography>
                  {!!meta.extraText && (
                    <>
                      <span
                        className={NOTIFICATION_CARD_META_DIVIDER_STYLE}
                        aria-hidden
                      />
                      <Typography
                        color={NOTIFICATION_CARD_COLORS.META_EXTRA_TEXT}
                        variant={TYPOGRAPHY_VARIANTS.LABEL}
                      >
                        {meta.extraText}
                      </Typography>
                    </>
                  )}
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
