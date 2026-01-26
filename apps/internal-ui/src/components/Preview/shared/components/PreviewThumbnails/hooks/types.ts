import { Dispatch, SetStateAction } from 'react';

import { PreviewThumbnailPdfProps } from '@/components/Preview/shared/components/PreviewThumbnails/types';

export interface UsePreviewThumbnailPdfParams
  extends Pick<PreviewThumbnailPdfProps, 'file' | 'setIsLoading'> {}

export interface UsePreviewThumbnailPdfReturnType {
  url: string | null;
}

export interface UsePreviewThumbnailPdfUrlEffectParams
  extends UsePreviewThumbnailPdfParams {
  setUrl: Dispatch<SetStateAction<string | null>>;
}
