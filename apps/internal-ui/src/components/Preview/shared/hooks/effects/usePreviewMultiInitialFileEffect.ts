import { useEffect } from 'react';

import { UsePreviewMultiInitialFileEffectParams } from '@/components/Preview/shared/hooks/effects/types';

const usePreviewMultiInitialFileEffect = ({
  files,
  initialFile,
  onChange,
}: UsePreviewMultiInitialFileEffectParams) => {
  useEffect(() => {
    onChange({ file: initialFile ?? files[0] });
  }, [initialFile, files]);
};

export default usePreviewMultiInitialFileEffect;
