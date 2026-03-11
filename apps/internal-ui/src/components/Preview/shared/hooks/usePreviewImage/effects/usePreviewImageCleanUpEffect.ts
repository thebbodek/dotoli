import { useEffect } from 'react';

import { UsePreviewImageCleanUpEffectProps } from '@/components/Preview/shared/hooks/usePreviewImage/types';

const usePreviewImageResetEffect = ({
  file,
  onReset,
}: UsePreviewImageCleanUpEffectProps) => {
  useEffect(() => {
    if (!file) return;

    onReset();
  }, [file]);
};

export default usePreviewImageResetEffect;
