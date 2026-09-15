import clsx from 'clsx';
import Link from 'next/link';

import {
  HEADER_BAR_NOTIFICATION_DOT_STYLE,
  HEADER_BAR_NOTIFICATION_ICON_KEY,
  HEADER_BAR_NOTIFICATION_ICON_WEIGHT,
  HEADER_BAR_NOTIFICATION_LABEL,
  HEADER_BAR_NOTIFICATION_LINK_STYLE,
  HEADER_BAR_NOTIFICATION_UNREAD_LABEL,
  HEADER_BAR_THEME_STYLES,
} from '@/components/HeaderBar/constants';
import { HeaderBarNotificationLinkProps } from '@/components/HeaderBar/types';
import { Icon } from '@/components/Icon';

const HeaderBarNotificationLink = ({
  theme,
  hasUnreadNotification,
  href,
}: HeaderBarNotificationLinkProps) => {
  const { NOTIFICATION_ICON } = HEADER_BAR_THEME_STYLES[theme];

  return (
    <Link
      aria-label={
        hasUnreadNotification
          ? HEADER_BAR_NOTIFICATION_UNREAD_LABEL
          : HEADER_BAR_NOTIFICATION_LABEL
      }
      className={clsx(HEADER_BAR_NOTIFICATION_LINK_STYLE, NOTIFICATION_ICON)}
      href={href}
    >
      <Icon
        iconKey={HEADER_BAR_NOTIFICATION_ICON_KEY}
        weight={HEADER_BAR_NOTIFICATION_ICON_WEIGHT}
        aria-hidden
      />
      {hasUnreadNotification && (
        <span className={HEADER_BAR_NOTIFICATION_DOT_STYLE} aria-hidden />
      )}
    </Link>
  );
};

export default HeaderBarNotificationLink;
