import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import { PreviewImageSize } from '@/components/Preview/shared/components';

export interface UsePreviewImageReturnType {
  models: {
    imgSize: PreviewImageSize | null;
  };
  status: {
    isLoading: boolean;
    isError: boolean;
  };
  operations: {
    onLoadImage: (e: SyntheticEvent<HTMLImageElement>) => void;
    onError: () => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setIsError: Dispatch<SetStateAction<boolean>>;
  };
}
