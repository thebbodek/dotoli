import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import {
  TypographyElementType,
  TypographyProps,
} from '@/components/Typography/types';
import {
  COLOR_STYLES_MAPPER,
  COLOR_VARIANTS,
  TYPOGRAPHY_STYLES_MAPPER,
  TYPOGRAPHY_VARIANTS,
} from '@/variants';

const Typography = <T extends TypographyElementType = 'span'>({
  as,
  variant = TYPOGRAPHY_VARIANTS.BODY_16_R,
  color = COLOR_VARIANTS.BLACK,
  className,
  children,
  title,
}: PropsWithChildren<TypographyProps<T>>) => {
  const Component = as || 'span';

  return (
    <Component
      className={clsx(
        TYPOGRAPHY_STYLES_MAPPER[variant],
        COLOR_STYLES_MAPPER.TEXT[color],
        className,
      )}
      title={title}
    >
      {children}
    </Component>
  );
};

export default Typography;
