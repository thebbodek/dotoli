import { useEffect } from 'react';

import { PREVIEW_THUMBNAIL_SIZE } from '@/components/Preview/shared/components/PreviewThumbnails/constants';
import { UsePreviewThumbnailPdfUrlEffectParams } from '@/components/Preview/shared/components/PreviewThumbnails/hooks/types';
import {
  getPdfDoc,
  getPdfImageUrl,
} from '@/components/Preview/shared/utils/getPdfImageUrl';

const usePreviewThumbnailPdfUrlEffect = ({
  file,
  setUrl,
  setIsLoading,
}: UsePreviewThumbnailPdfUrlEffectParams) => {
  useEffect(() => {
    const setPdfThumbnailUrl = async () => {
      setIsLoading(true);

      try {
        const doc = await getPdfDoc({ file });
        const url = await getPdfImageUrl({
          doc,
          pageNum: 1,
          width: PREVIEW_THUMBNAIL_SIZE,
        });

        setUrl(url);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    setPdfThumbnailUrl();
  }, [file]);
};

export default usePreviewThumbnailPdfUrlEffect;
