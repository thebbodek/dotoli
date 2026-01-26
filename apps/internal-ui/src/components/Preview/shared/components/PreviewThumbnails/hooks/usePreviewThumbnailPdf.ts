import { useState } from 'react';

import usePreviewThumbnailPdfUrlEffect from '@/components/Preview/shared/components/PreviewThumbnails/hooks/effects/usePreviewThumbnailPdfUrlEffect';
import { UsePreviewThumbnailPdfParams } from '@/components/Preview/shared/components/PreviewThumbnails/hooks/types';

const usePreviewThumbnailPdf = ({
  file,
  setIsLoading,
}: UsePreviewThumbnailPdfParams) => {
  const [url, setUrl] = useState<string | null>(null);

  usePreviewThumbnailPdfUrlEffect({ file, setUrl, setIsLoading });

  return { url };
};

export default usePreviewThumbnailPdf;
