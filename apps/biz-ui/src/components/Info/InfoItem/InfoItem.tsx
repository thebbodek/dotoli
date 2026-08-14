import clsx from 'clsx';

import { Icon, ICON_WEIGHTS } from '@/components/Icon';
import {
  INFO_ITEM_BASE_STYLE,
  INFO_ITEM_ICON_KEY,
  INFO_ITEM_ICON_STYLE,
  INFO_ITEM_LABEL_STYLE,
  INFO_ITEM_STYLES,
  INFO_ITEM_THEMES,
} from '@/components/Info/InfoItem/constants';
import { InfoItemProps } from '@/components/Info/InfoItem/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const InfoItem = ({
  label,
  theme = INFO_ITEM_THEMES.GRAY,
  className,
}: InfoItemProps) => {
  const { ICON, LABEL } = INFO_ITEM_STYLES[theme];

  return (
    <p className={clsx(className, INFO_ITEM_BASE_STYLE)}>
      <Icon
        className={clsx(INFO_ITEM_ICON_STYLE, ICON)}
        iconKey={INFO_ITEM_ICON_KEY}
        weight={ICON_WEIGHTS.FILL}
        aria-hidden
      />
      <Typography
        className={INFO_ITEM_LABEL_STYLE}
        color={LABEL}
        variant={TYPOGRAPHY_VARIANTS.BODY}
      >
        {label}
      </Typography>
    </p>
  );
};

export default InfoItem;
