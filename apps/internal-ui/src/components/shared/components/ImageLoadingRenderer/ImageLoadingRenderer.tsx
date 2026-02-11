import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { ImageLoadingRendererProps } from '@/components/shared/components/ImageLoadingRenderer/types';

const ImageLoadingRenderer = ({
  className,
  isLoading,
  loadingComponent,
  children,
}: PropsWithChildren<ImageLoadingRendererProps>) => {
  return (
    <>
      {children}
      {(!children || isLoading) && (
        <div
          className={clsx(
            className,
            'in-flex-v-stack-center absolute top-0 left-0 z-10 h-full w-full',
          )}
        >
          {loadingComponent}
        </div>
      )}
    </>
  );
};

export default ImageLoadingRenderer;
