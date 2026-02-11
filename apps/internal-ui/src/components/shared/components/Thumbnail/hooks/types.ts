import { Dispatch, SetStateAction } from 'react';

import { PreviewThumbnailPdfProps } from '@/components/Preview/shared/components/PreviewThumbnails/types';

export interface UseThumbnailPdfParams extends PreviewThumbnailPdfProps {}

export interface UseThumbnailPdfReturnType {
  url: string | null;
}

export interface UseThumbnailPdfUrlEffectParams extends UseThumbnailPdfParams {
  setUrl: Dispatch<SetStateAction<string | null>>;
}
