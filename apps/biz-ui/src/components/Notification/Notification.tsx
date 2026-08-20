import clsx from 'clsx';

import { CtaButton } from '@/components/Button';
import { Icon } from '@/components/Icon';
import {
  NOTIFICATION_ACTION_OPTION,
  NOTIFICATION_BASE_STYLE,
  NOTIFICATION_BODY_STYLE,
  NOTIFICATION_COLORS,
  NOTIFICATION_COMPANY_NAME_STYLE,
  NOTIFICATION_DEFAULT_VARIANT,
  NOTIFICATION_DESCRIPTION_STYLE,
  NOTIFICATION_HEADER_STYLE,
  NOTIFICATION_ICON_STYLE,
  NOTIFICATION_ICON_WEIGHT,
  NOTIFICATION_RECEIVED_AT_STYLE,
  NOTIFICATION_SOURCE_STYLE,
  NOTIFICATION_TEXT_STYLE,
  NOTIFICATION_VARIANT_STYLES,
} from '@/components/Notification/constants';
import { NotificationProps } from '@/components/Notification/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

/**
 * @description: 카드가 `<button>`이 아닌 이유와 `CtaButton`에 `onClick`을 넘기지 않는 이유는
 * docs/biz-ui/components/notification.md 「카드 전체가 탭 영역입니다」에 있습니다.
 * */
const Notification = ({
  iconKey,
  companyName,
  receivedAt,
  title,
  description,
  variant = NOTIFICATION_DEFAULT_VARIANT,
  className,
  onAction,
}: NotificationProps) => {
  return (
    <div
      className={clsx(
        className,
        NOTIFICATION_BASE_STYLE,
        NOTIFICATION_VARIANT_STYLES[variant],
        !!onAction && 'cursor-pointer',
      )}
      onClick={onAction}
    >
      <div className={NOTIFICATION_HEADER_STYLE}>
        <span className={NOTIFICATION_SOURCE_STYLE}>
          <Icon
            className={NOTIFICATION_ICON_STYLE}
            iconKey={iconKey}
            weight={NOTIFICATION_ICON_WEIGHT}
            aria-hidden
          />
          <Typography
            className={NOTIFICATION_COMPANY_NAME_STYLE}
            color={NOTIFICATION_COLORS.COMPANY_NAME}
            variant={TYPOGRAPHY_VARIANTS.LABEL}
          >
            {companyName}
          </Typography>
        </span>
        <Typography
          className={NOTIFICATION_RECEIVED_AT_STYLE}
          color={NOTIFICATION_COLORS.RECEIVED_AT}
          variant={TYPOGRAPHY_VARIANTS.LABEL}
        >
          {receivedAt}
        </Typography>
      </div>
      <div className={NOTIFICATION_BODY_STYLE}>
        <div className={NOTIFICATION_TEXT_STYLE}>
          <Typography
            color={NOTIFICATION_COLORS.TITLE}
            variant={TYPOGRAPHY_VARIANTS.HEADING_5}
          >
            {title}
          </Typography>
          <Typography
            className={NOTIFICATION_DESCRIPTION_STYLE}
            color={NOTIFICATION_COLORS.DESCRIPTION}
            variant={TYPOGRAPHY_VARIANTS.BODY}
          >
            {description}
          </Typography>
        </div>
        {!!onAction && <CtaButton {...NOTIFICATION_ACTION_OPTION} />}
      </div>
    </div>
  );
};

export default Notification;
