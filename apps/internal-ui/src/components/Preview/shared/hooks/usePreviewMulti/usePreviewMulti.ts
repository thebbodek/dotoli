import { useId, useState } from 'react';

import {
  PreviewMultiFile,
  PreviewMultiPrimitiveProps,
  usePreviewMultiInitialFileEffect,
} from '@/components/Preview/shared';
import {
  PreviewMultiOnChangeParams,
  UsePreviewMultiReturnType,
} from '@/components/Preview/shared/hooks/usePreviewMulti/types';

const usePreviewMulti = ({
  files,
  initialFile,
}: Pick<
  PreviewMultiPrimitiveProps,
  'files' | 'initialFile'
>): UsePreviewMultiReturnType => {
  const previewId = useId();
  const [currentFile, setCurrentFile] = useState<PreviewMultiFile | null>(null);

  const onChange = ({ file }: PreviewMultiOnChangeParams) => {
    if (currentFile && currentFile.id === file.id) return;

    setCurrentFile(file);
  };

  usePreviewMultiInitialFileEffect({ files, initialFile, onChange });

  return {
    models: {
      previewId,
      currentFile,
    },
    operations: {
      onChange,
    },
  };
};

export default usePreviewMulti;
