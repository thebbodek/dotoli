import { useId, useRef, useState } from 'react';

import { PREVIEW_TRANSFORM_INITIAL_VALUES } from '@/components/Preview/shared/components/Preview/constants';
import usePreviewViewerSizeEffect from '@/components/Preview/shared/components/Preview/hooks/effects/usePreviewViewerSizeEffect/usePreviewViewerSizeEffect';
import {
  PreviewOptions,
  PreviewViewerSize,
  UsePreviewReturnType,
} from '@/components/Preview/shared/components/Preview/hooks/types';

const usePreview = (): UsePreviewReturnType => {
  const titleId = useId();
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const [viewerSize, setViewerSize] = useState<PreviewViewerSize>(null);
  const [previewOptions, setPreviewOptions] = useState<PreviewOptions>(
    PREVIEW_TRANSFORM_INITIAL_VALUES,
  );

  usePreviewViewerSizeEffect({ viewerRef, setViewerSize });

  return {
    models: { viewerRef, viewerSize, titleId, previewOptions },
    operations: { setPreviewOptions },
  };
};

export default usePreview;
