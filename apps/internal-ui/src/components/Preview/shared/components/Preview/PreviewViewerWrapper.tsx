import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

import { ComponentPropsRef } from '@/components/shared';

const PreviewViewerWrapper = ({
  id,
  ref,
  'aria-labelledby': ariaLabelledby,
  className,
  children,
}: PropsWithChildren<
  ComponentPropsRef<HTMLDivElement> &
    Pick<HTMLAttributes<HTMLDivElement>, 'id' | 'aria-labelledby' | 'className'>
>) => {
  return (
    <div
      className={clsx(
        className,
        'in-flex-v-stack relative items-center-safe justify-center-safe overflow-auto',
      )}
      aria-labelledby={ariaLabelledby}
      id={id}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default PreviewViewerWrapper;
