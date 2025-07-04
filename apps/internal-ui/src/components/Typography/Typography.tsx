import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { TYPOGRAPHY_ELEMENTS } from '@/components/Typography/constants';
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

const Typography = <
  T extends TypographyElementType = typeof TYPOGRAPHY_ELEMENTS.SPAN,
>({
  as,
  variant = TYPOGRAPHY_VARIANTS.BODY_16_R,
  color = COLOR_VARIANTS.BLACK,
  className,
  children,
  title,
  id,
  ariaLive,
  role,
}: PropsWithChildren<TypographyProps<T>>) => {
  const Component = as || TYPOGRAPHY_ELEMENTS.SPAN;

  return (
    <Component
      className={clsx(
        className,
        TYPOGRAPHY_STYLES_MAPPER[variant],
        COLOR_STYLES_MAPPER.TEXT[color],
      )}
      id={id}
      title={title}
      role={role}
      aria-live={ariaLive}
    >
      {children}
    </Component>
  );
};

export default Typography;
