import clsx from 'clsx';

import {
  HEADER_BAR_NOTIFICATION_BUTTON_STYLE,
  HEADER_BAR_NOTIFICATION_DOT_STYLE,
  HEADER_BAR_NOTIFICATION_ICON_KEY,
  HEADER_BAR_NOTIFICATION_ICON_WEIGHT,
  HEADER_BAR_NOTIFICATION_LABEL,
  HEADER_BAR_THEME_STYLES,
} from '@/components/HeaderBar/constants';
import { HeaderBarNotificationButtonProps } from '@/components/HeaderBar/types';
import { Icon } from '@/components/Icon';

const HeaderBarNotificationButton = ({
  theme,
  hasUnreadNotification,
  onClick,
}: HeaderBarNotificationButtonProps) => {
  const { NOTIFICATION_ICON } = HEADER_BAR_THEME_STYLES[theme];

  return (
    <button
      aria-label={HEADER_BAR_NOTIFICATION_LABEL}
      className={clsx(HEADER_BAR_NOTIFICATION_BUTTON_STYLE, NOTIFICATION_ICON)}
      type='button'
      onClick={onClick}
    >
      <Icon
        iconKey={HEADER_BAR_NOTIFICATION_ICON_KEY}
        weight={HEADER_BAR_NOTIFICATION_ICON_WEIGHT}
        aria-hidden
      />
      {hasUnreadNotification && (
        <span className={HEADER_BAR_NOTIFICATION_DOT_STYLE} aria-hidden />
      )}
    </button>
  );
};

export default HeaderBarNotificationButton;
