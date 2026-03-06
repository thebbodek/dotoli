import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import {
  PreviewImageSize,
  PreviewProps,
} from '@/components/Preview/shared/components';
import { NonNullableType } from '@/components/shared';

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
    onReset: () => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setIsError: Dispatch<SetStateAction<boolean>>;
  };
}

export interface UsePreviewImageCleanUpEffectProps
  extends NonNullableType<Pick<PreviewProps, 'file'>>,
    Pick<UsePreviewImageReturnType['operations'], 'onReset'> {}
