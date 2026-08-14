import clsx from 'clsx';

import {
  DIVIDER_CONTAINER_STYLE,
  DIVIDER_FULL_LINE_STYLE,
  DIVIDER_ICON_KEYS,
  DIVIDER_ICON_STYLE,
  DIVIDER_LABEL_COLOR,
  DIVIDER_LABEL_STYLE,
  DIVIDER_LINE_COLORS,
  DIVIDER_SEGMENT_LINE_STYLE,
  DIVIDER_TYPES,
} from '@/components/Divider/constants';
import { DividerProps } from '@/components/Divider/types';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const Divider = ({
  type = DIVIDER_TYPES.UP,
  label,
  className,
}: DividerProps) => {
  const lineColor = DIVIDER_LINE_COLORS[type];

  if (type === DIVIDER_TYPES.LINE) {
    return (
      <div className={clsx(className, DIVIDER_FULL_LINE_STYLE, lineColor)} />
    );
  }

  return (
    <div className={clsx(className, DIVIDER_CONTAINER_STYLE)}>
      <span className={clsx(DIVIDER_SEGMENT_LINE_STYLE, lineColor)} />
      {type === DIVIDER_TYPES.TEXT ? (
        <Typography
          className={DIVIDER_LABEL_STYLE}
          color={DIVIDER_LABEL_COLOR}
          variant={TYPOGRAPHY_VARIANTS.LABEL}
        >
          {label}
        </Typography>
      ) : (
        <Icon
          className={DIVIDER_ICON_STYLE}
          iconKey={DIVIDER_ICON_KEYS[type]}
          aria-hidden
        />
      )}
      <span className={clsx(DIVIDER_SEGMENT_LINE_STYLE, lineColor)} />
    </div>
  );
};

export default Divider;
