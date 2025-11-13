import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { TYPOGRAPHY_ELEMENTS } from '@/components/Typography/constants';
import {
  TypographyElementType,
  TypographyProps,
} from '@/components/Typography/types';
import { COLOR_STYLES_MAPPER, TYPOGRAPHY_STYLES_MAPPER } from '@/variants';

const Typography = <
  T extends TypographyElementType = typeof TYPOGRAPHY_ELEMENTS.SPAN,
>({
  as,
  variant,
  color,
  className,
  children,
  title,
  id,
  'aria-live': ariaLive,
  role,
}: PropsWithChildren<TypographyProps<T>>) => {
  const Component = as || TYPOGRAPHY_ELEMENTS.SPAN;

  return (
    <Component
      className={clsx(
        className,
        variant && TYPOGRAPHY_STYLES_MAPPER[variant],
        color ? COLOR_STYLES_MAPPER.TEXT[color] : 'text-inherit',
      )}
      aria-live={ariaLive}
      id={id}
      role={role}
      title={title}
    >
      {children}
    </Component>
  );
};

export default Typography;
