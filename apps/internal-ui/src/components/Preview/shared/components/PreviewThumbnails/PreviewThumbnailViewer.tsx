import dynamic from 'next/dynamic';
import { useState } from 'react';

import {
  isSupportImageFileType,
  isSupportPdfFileType,
  PreviewThumbnailViewerProps,
} from '@/components/Preview/shared';

const PreviewThumbnailLoading = dynamic(
  () => import('./PreviewThumbnailLoading'),
  { ssr: false },
);

const PreviewThumbnailImage = dynamic(() => import('./PreviewThumbnailImage'), {
  ssr: false,
});

const PreviewThumbnailPdf = dynamic(() => import('./PreviewThumbnailPdf'), {
  ssr: false,
});

const PreviewThumbnailViewer = ({ file }: PreviewThumbnailViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const { type, blob, original } = file;

  const renderer = () => {
    if (isSupportImageFileType({ type })) {
      return <PreviewThumbnailImage setIsLoading={setIsLoading} src={blob} />;
    }

    if (isSupportPdfFileType({ type })) {
      return (
        <PreviewThumbnailPdf file={original} setIsLoading={setIsLoading} />
      );
    }
  };

  return (
    <>
      {renderer()}
      {isLoading && (
        <div className='bg-in-gray-01 in-flex-h-stack-center absolute top-0 left-0 z-10 h-full w-full'>
          <PreviewThumbnailLoading />
        </div>
      )}
    </>
  );
};

export default PreviewThumbnailViewer;
