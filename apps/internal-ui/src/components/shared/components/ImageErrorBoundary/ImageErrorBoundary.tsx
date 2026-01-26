import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { ImageErrorBoundaryProps } from '@/components/shared/components/ImageErrorBoundary/types';

const ImageErrorBoundary = ({
  className,
  isError,
  errorComponent,
  children,
}: PropsWithChildren<ImageErrorBoundaryProps>) => {
  return (
    <>
      {children && children}
      {isError && (
        <div
          className={clsx(
            'in-flex-v-stack-center absolute top-0 left-0 z-10 h-full w-full',
            className,
          )}
        >
          {errorComponent}
        </div>
      )}
    </>
  );
};

export default ImageErrorBoundary;
