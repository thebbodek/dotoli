import { PropsWithChildren } from 'react';

import PreviewLoading from '@/components/Preview/shared/components/Preview/PreviewLoading';
import { PreviewImageRendererProps } from '@/components/Preview/shared/components/Preview/types';

const PreviewImageRenderer = ({
  children,
  isLoading,
}: PropsWithChildren<PreviewImageRendererProps>) => {
  return (
    <>
      {children && children}
      {(!children || isLoading) && (
        <PreviewLoading className='absolute top-0 left-0 z-10 h-full w-full' />
      )}
    </>
  );
};

export default PreviewImageRenderer;
