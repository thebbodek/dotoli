import { SyntheticEvent, useState } from 'react';

import { PreviewImageSize } from '@/components/Preview/shared/components';
import { UsePreviewImageReturnType } from '@/components/Preview/shared/hooks/usePreviewImage/types';

const usePreviewImage = (): UsePreviewImageReturnType => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imgSize, setImgSize] = useState<PreviewImageSize | null>(null);

  const onLoadImage = (e: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;

    if (!imgSize) {
      setImgSize({ width: naturalWidth, height: naturalHeight });
    }

    setIsLoading(false);
  };

  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  return {
    models: { imgSize },
    status: { isLoading, isError },
    operations: { onLoadImage, onError, setIsLoading, setIsError },
  };
};

export default usePreviewImage;
