import { getUUID } from '@bbodek/utils';
import { useEffect } from 'react';

import { UsePreviewPdfImageUrlsEffectParams } from '@/components/Preview/shared/components/Preview/hooks/effects/usePreviewPdfImageUrlsEffect/types';
import {
  getPdfDoc,
  getPdfImageUrl,
} from '@/components/Preview/shared/utils/getPdfImageUrl';

const usePreviewPdfImageUrlsEffect = ({
  file,
  width,
  listRef,
  setUrls,
  setIsLoading,
}: UsePreviewPdfImageUrlsEffectParams) => {
  const setPdfImageUrls = async () => {
    try {
      const doc = await getPdfDoc({ file: file.original });
      const promises = Array.from({ length: doc.numPages }, (_, index) =>
        getPdfImageUrl({ doc, pageNum: index + 1, width }),
      );
      const urls = await Promise.all(promises);

      setUrls(urls.map((url) => ({ id: getUUID(), url, isLoaded: false })));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(true);

    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    reset();
    setPdfImageUrls();
  }, [file, listRef, width]);
};

export default usePreviewPdfImageUrlsEffect;
