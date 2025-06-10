import { useEffect } from 'react';

import { UseBodyScrollLockEffectProps } from '@/components/shared/components/Overlay/types';

const useBodyScrollLockEffect = ({
  isLocked,
}: UseBodyScrollLockEffectProps) => {
  useEffect(() => {
    if (isLocked) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => document.body.classList.remove('overflow-hidden');
  }, [isLocked]);
};

export default useBodyScrollLockEffect;
