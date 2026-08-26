import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import {
  PAGE_BODY_BASE_STYLE,
  PAGE_BODY_DEFAULT_VARIANT,
  PAGE_BODY_VARIANT_STYLES,
} from '@/components/PageBody/constants';
import { PageBodyProps } from '@/components/PageBody/types';

const PageBody = ({
  variant = PAGE_BODY_DEFAULT_VARIANT,
  className,
  children,
}: PropsWithChildren<PageBodyProps>) => {
  return (
    <div
      className={clsx(
        className,
        PAGE_BODY_BASE_STYLE,
        PAGE_BODY_VARIANT_STYLES[variant],
      )}
    >
      {children}
    </div>
  );
};

export default PageBody;
