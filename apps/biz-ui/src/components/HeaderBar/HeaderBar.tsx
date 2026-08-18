import clsx from 'clsx';

import { BUTTON_ICON_POSITIONS } from '@/components/Button/shared/constants';
import {
  HEADER_BAR_BACK_ICON_KEY,
  HEADER_BAR_BACK_LABEL,
  HEADER_BAR_BASE_STYLE,
  HEADER_BAR_BOTTOM_SHEET_STYLE,
  HEADER_BAR_CLOSE_ICON_KEY,
  HEADER_BAR_CLOSE_LABEL,
  HEADER_BAR_NAVIGATION_TITLE_STYLE,
  HEADER_BAR_ROW_STYLE,
  HEADER_BAR_THEME_STYLES,
  HEADER_BAR_THEMES,
  HEADER_BAR_TITLE_STYLE,
  HEADER_BAR_TYPES,
} from '@/components/HeaderBar/constants';
import HeaderBarHomeTitle from '@/components/HeaderBar/HeaderBarHomeTitle';
import HeaderBarNavigationButton from '@/components/HeaderBar/HeaderBarNavigationButton';
import HeaderBarNotificationButton from '@/components/HeaderBar/HeaderBarNotificationButton';
import HeaderBarProgress from '@/components/HeaderBar/HeaderBarProgress';
import { HeaderBarProps } from '@/components/HeaderBar/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const HeaderBar = ({
  title,
  type = HEADER_BAR_TYPES.HOME,
  theme = HEADER_BAR_THEMES.LIGHT,
  hasUnreadNotification = false,
  progressOption,
  className,
  onTitleClick,
  onNotificationClick,
  onBack,
  onClose,
}: HeaderBarProps) => {
  const { CONTAINER, TITLE } = HEADER_BAR_THEME_STYLES[theme];
  const isHome = type === HEADER_BAR_TYPES.HOME;
  const isNavigation = type === HEADER_BAR_TYPES.NAVIGATION;

  return (
    <header
      className={clsx(
        className,
        HEADER_BAR_BASE_STYLE,
        CONTAINER,
        type === HEADER_BAR_TYPES.BOTTOM_SHEET && HEADER_BAR_BOTTOM_SHEET_STYLE,
      )}
    >
      <div className={HEADER_BAR_ROW_STYLE}>
        {isNavigation && !!onBack && (
          <HeaderBarNavigationButton
            iconKey={HEADER_BAR_BACK_ICON_KEY}
            iconPosition={BUTTON_ICON_POSITIONS.LEFT}
            label={HEADER_BAR_BACK_LABEL}
            onClick={onBack}
          />
        )}
        {isHome ? (
          <HeaderBarHomeTitle
            theme={theme}
            title={title}
            onTitleClick={onTitleClick}
          />
        ) : (
          <Typography
            className={clsx(
              HEADER_BAR_TITLE_STYLE,
              isNavigation && HEADER_BAR_NAVIGATION_TITLE_STYLE,
            )}
            color={TITLE}
            variant={TYPOGRAPHY_VARIANTS.BODY_BOLD}
          >
            {title}
          </Typography>
        )}
        {isHome && !!onNotificationClick && (
          <HeaderBarNotificationButton
            hasUnreadNotification={hasUnreadNotification}
            theme={theme}
            onClick={onNotificationClick}
          />
        )}
        {!isHome && !!onClose && (
          <HeaderBarNavigationButton
            iconKey={HEADER_BAR_CLOSE_ICON_KEY}
            iconPosition={BUTTON_ICON_POSITIONS.RIGHT}
            label={HEADER_BAR_CLOSE_LABEL}
            onClick={onClose}
          />
        )}
      </div>
      {isNavigation && !!progressOption && (
        <HeaderBarProgress {...progressOption} />
      )}
    </header>
  );
};

export default HeaderBar;
