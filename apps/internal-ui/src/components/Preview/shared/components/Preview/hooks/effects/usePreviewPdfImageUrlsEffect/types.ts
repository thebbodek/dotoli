import { Dispatch, RefObject, SetStateAction } from 'react';

import { PreviewPdfViewerProps } from '@/components/Preview/shared/components/Preview/types';
import { GetPreviewPdfImageUrlParams } from '@/components/Preview/shared/utils/getPdfImageUrl/types';

export interface PreviewPdfImageUrl {
  id: string;
  url: string;
  isLoaded: boolean;
}

export interface UsePreviewPdfImageUrlsEffectParams
  extends Pick<PreviewPdfViewerProps, 'file'>,
    Pick<GetPreviewPdfImageUrlParams, 'width'> {
  listRef: RefObject<HTMLDivElement | null>;
  setUrls: Dispatch<SetStateAction<PreviewPdfImageUrl[] | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
