import clsx from 'clsx';

import { Icon, ICON_WEIGHTS } from '@/components/Icon';
import {
  INFO_BANNER_ACTION_ICON_KEY,
  INFO_BANNER_ACTION_ICON_STYLE,
  INFO_BANNER_ACTION_STYLE,
  INFO_BANNER_ACTION_WRAPPER_STYLE,
  INFO_BANNER_BASE_STYLE,
  INFO_BANNER_ICON_KEY,
  INFO_BANNER_ICON_STYLE,
  INFO_BANNER_INLINE_STYLE,
  INFO_BANNER_STYLES,
  INFO_BANNER_TEXT_STYLE,
  INFO_BANNER_THEMES,
} from '@/components/Info/InfoBanner/constants';
import { InfoBannerProps } from '@/components/Info/InfoBanner/types';
import { Typography, TYPOGRAPHY_ELEMENTS } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const InfoBanner = ({
  title,
  description,
  theme = INFO_BANNER_THEMES.PRIMARY,
  isSticky = false,
  className,
  onClick,
}: InfoBannerProps) => {
  const { BACKGROUND, RING, STICKY_RING, ICON } = INFO_BANNER_STYLES[theme];

  const bannerClassName = clsx(
    className,
    INFO_BANNER_BASE_STYLE,
    BACKGROUND,
    isSticky ? STICKY_RING : [INFO_BANNER_INLINE_STYLE, RING],
    !!onClick && INFO_BANNER_ACTION_STYLE,
  );

  const content = (
    <>
      <Icon
        className={clsx(INFO_BANNER_ICON_STYLE, ICON)}
        iconKey={INFO_BANNER_ICON_KEY}
        weight={ICON_WEIGHTS.FILL}
        aria-hidden
      />
      <span className={INFO_BANNER_TEXT_STYLE}>
        {!!title && (
          <Typography
            as={TYPOGRAPHY_ELEMENTS.STRONG}
            color={COLOR_VARIANTS.GRAY_800}
            variant={TYPOGRAPHY_VARIANTS.LABEL_BOLD}
          >
            {title}
          </Typography>
        )}
        <Typography
          color={COLOR_VARIANTS.GRAY_800}
          variant={TYPOGRAPHY_VARIANTS.LABEL}
        >
          {description}
        </Typography>
      </span>
      {!!onClick && (
        <span className={INFO_BANNER_ACTION_WRAPPER_STYLE}>
          <Icon
            className={INFO_BANNER_ACTION_ICON_STYLE}
            iconKey={INFO_BANNER_ACTION_ICON_KEY}
            aria-hidden
          />
        </span>
      )}
    </>
  );

  return onClick ? (
    <button className={bannerClassName} type='button' onClick={onClick}>
      {content}
    </button>
  ) : (
    <div className={bannerClassName}>{content}</div>
  );
};

export default InfoBanner;
