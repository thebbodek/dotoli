import clsx from 'clsx';

import {
  HEADER_BAR_CARET_ICON_KEY,
  HEADER_BAR_CARET_STYLE,
  HEADER_BAR_HOME_TITLE_STYLE,
  HEADER_BAR_HOME_TITLE_WRAPPER_STYLE,
  HEADER_BAR_THEME_STYLES,
  HEADER_BAR_TITLE_STYLE,
} from '@/components/HeaderBar/constants';
import { HeaderBarHomeTitleProps } from '@/components/HeaderBar/types';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const HeaderBarHomeTitle = ({
  title,
  titleAs,
  theme,
  onTitleClick,
}: HeaderBarHomeTitleProps) => {
  const { TITLE, CARET } = HEADER_BAR_THEME_STYLES[theme];

  if (!onTitleClick) {
    return (
      <Typography
        as={titleAs}
        className={HEADER_BAR_TITLE_STYLE}
        color={TITLE}
        variant={TYPOGRAPHY_VARIANTS.BODY_BOLD}
      >
        {title}
      </Typography>
    );
  }

  return (
    <Typography
      as={titleAs}
      className={HEADER_BAR_HOME_TITLE_WRAPPER_STYLE}
      color={TITLE}
      variant={TYPOGRAPHY_VARIANTS.BODY_BOLD}
    >
      <button
        className={HEADER_BAR_HOME_TITLE_STYLE}
        type='button'
        onClick={onTitleClick}
      >
        <Typography className={HEADER_BAR_TITLE_STYLE}>{title}</Typography>
        <Icon
          className={clsx(HEADER_BAR_CARET_STYLE, CARET)}
          iconKey={HEADER_BAR_CARET_ICON_KEY}
          aria-hidden
        />
      </button>
    </Typography>
  );
};

export default HeaderBarHomeTitle;
