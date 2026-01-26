import { Dispatch, RefObject, SetStateAction } from 'react';

import {
  PREVIEW_FIT_MODE,
  PREVIEW_TRANSFORM_VALUES,
} from '@/components/Preview/shared/components/Preview/constants';

export type PreviewFitMode =
  (typeof PREVIEW_FIT_MODE)[keyof typeof PREVIEW_FIT_MODE];

export type PreviewScale =
  (typeof PREVIEW_TRANSFORM_VALUES.SCALE)[keyof typeof PREVIEW_TRANSFORM_VALUES.SCALE];

export type PreviewRotate =
  (typeof PREVIEW_TRANSFORM_VALUES.ROTATE)[keyof typeof PREVIEW_TRANSFORM_VALUES.ROTATE];

export interface PreviewOptions {
  scale: PreviewScale;
  rotate: PreviewRotate;
  fitMode: PreviewFitMode | null;
}

export interface UsePreviewReturnType {
  models: {
    viewerRef: RefObject<HTMLDivElement | null>;
    viewerSize: Pick<DOMRect, 'width' | 'height'> | null;
    titleId: string;
    previewOptions: PreviewOptions;
  };
  operations: {
    setPreviewOptions: Dispatch<SetStateAction<PreviewOptions>>;
  };
}

export type PreviewViewerSize = Pick<DOMRect, 'width' | 'height'> | null;
