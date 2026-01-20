import { useEffect } from 'react';

import { UseDropzone } from '@/hooks/useDropzone/types';

const useDropzonePropsErrorEffect = ({
  multiple,
  limit,
}: Pick<UseDropzone, 'multiple' | 'limit'>) => {
  useEffect(() => {
    if (typeof limit !== 'undefined' && limit > 1 && !multiple) {
      throw new Error('limit이 1 이상일 경우 multiple 옵션을 활성화 해주세요');
    }
  }, [multiple, limit]);
};

export default useDropzonePropsErrorEffect;
