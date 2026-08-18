import clsx from 'clsx';

import { ButtonIcon } from '@/components/Button/shared';
import {
  HEADER_BAR_NAVIGATION_BUTTON_ICON_STYLE,
  HEADER_BAR_NAVIGATION_BUTTON_POSITION_STYLES,
  HEADER_BAR_NAVIGATION_BUTTON_STYLE,
} from '@/components/HeaderBar/constants';
import { HeaderBarNavigationButtonProps } from '@/components/HeaderBar/types';
import { TOUCH_TARGET_STYLE } from '@/components/shared/constants';

const HeaderBarNavigationButton = ({
  label,
  iconKey,
  iconPosition,
  onClick,
}: HeaderBarNavigationButtonProps) => {
  return (
    <button
      className={clsx(
        HEADER_BAR_NAVIGATION_BUTTON_STYLE,
        TOUCH_TARGET_STYLE,
        HEADER_BAR_NAVIGATION_BUTTON_POSITION_STYLES[iconPosition],
      )}
      type='button'
      onClick={onClick}
    >
      <ButtonIcon
        className={HEADER_BAR_NAVIGATION_BUTTON_ICON_STYLE}
        iconKey={iconKey}
      />
      {label}
    </button>
  );
};

export default HeaderBarNavigationButton;
