import { useEffect } from 'react';

import { UsePreviewViewerSizeEffectParams } from '@/components/Preview/shared/components/Preview/hooks/effects/usePreviewViewerSizeEffect/types';

const usePreviewViewerSizeEffect = ({
  viewerRef,
  setViewerSize,
}: UsePreviewViewerSizeEffectParams) => {
  useEffect(() => {
    if (!viewerRef.current) return;

    const setInitialViewerSize = () => {
      if (viewerRef.current) {
        const { width, height } = viewerRef.current.getBoundingClientRect();

        setViewerSize({ width, height });
      }
    };

    const observer = new ResizeObserver(setInitialViewerSize);

    setInitialViewerSize();
    observer.observe(viewerRef.current);

    return () => observer.disconnect();
  }, [viewerRef]);
};

export default usePreviewViewerSizeEffect;
