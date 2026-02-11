import { useState } from 'react';

import useThumbnailPdfUrlEffect from '@/components/shared/components/Thumbnail/hooks/effects/useThumbnailPdfUrlEffect';
import { UseThumbnailPdfParams } from '@/components/shared/components/Thumbnail/hooks/types';

const useThumbnailPdf = ({
  file,
  size,
  setIsLoading,
}: UseThumbnailPdfParams) => {
  const [url, setUrl] = useState<string | null>(null);

  useThumbnailPdfUrlEffect({ file, size, setUrl, setIsLoading });

  return { url };
};

export default useThumbnailPdf;
