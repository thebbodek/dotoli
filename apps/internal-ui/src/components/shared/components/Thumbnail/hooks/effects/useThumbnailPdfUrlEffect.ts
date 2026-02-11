import { useEffect } from 'react';

import {
  getPdfDoc,
  getPdfImageUrl,
} from '@/components/Preview/shared/utils/getPdfImageUrl';
import { UseThumbnailPdfUrlEffectParams } from '@/components/shared/components/Thumbnail/hooks/types';

const useThumbnailPdfUrlEffect = ({
  file,
  size,
  setUrl,
  setIsLoading,
}: UseThumbnailPdfUrlEffectParams) => {
  useEffect(() => {
    const setPdfThumbnailUrl = async () => {
      setIsLoading(true);

      try {
        const doc = await getPdfDoc({ file });
        const url = await getPdfImageUrl({
          doc,
          pageNum: 1,
          width: size,
        });

        setUrl(url);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    setPdfThumbnailUrl();
  }, [file, size]);
};

export default useThumbnailPdfUrlEffect;
