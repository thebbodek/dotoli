import { Dispatch, SetStateAction } from 'react';

import {
  PreviewViewerSize,
  UsePreviewReturnType,
} from '@/components/Preview/shared/components/Preview/hooks/types';

export interface UsePreviewViewerSizeEffectParams
  extends Pick<UsePreviewReturnType['models'], 'viewerRef'> {
  setViewerSize: Dispatch<SetStateAction<PreviewViewerSize>>;
}
