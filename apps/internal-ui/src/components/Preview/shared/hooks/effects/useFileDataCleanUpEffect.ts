import { useEffect, useRef } from 'react';

import { PreviewMultiProps } from '@/components/Preview/PreviewMulti';
import { isFileData } from '@/components/Preview/utils/isFileData';

const useFileDataCleanUpEffect = ({
  files,
}: Pick<PreviewMultiProps, 'files'>) => {
  const filesRef = useRef(files);

  filesRef.current = files;

  useEffect(() => {
    if (!filesRef.current) return;

    return () => {
      filesRef.current.forEach(
        (file) => isFileData(file) && URL.revokeObjectURL(file.blob),
      );
    };
  }, []);
};

export default useFileDataCleanUpEffect;
