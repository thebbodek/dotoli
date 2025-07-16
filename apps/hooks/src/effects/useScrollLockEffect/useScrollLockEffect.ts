import { useEffect } from 'react';

import { UseScrollLockEffectProps } from '@/effects/useScrollLockEffect/types';

const useScrollLockEffect = ({
  isLocked,
  target,
}: UseScrollLockEffectProps) => {
  useEffect(() => {
    const element = target ? document.getElementById(target) : document.body;

    if (element) {
      if (isLocked) {
        element.style.overflow = 'hidden';
      } else {
        element.style.overflow = 'auto';
      }

      return () => {
        element.style.overflow = 'auto';
      };
    }
  }, [isLocked, target]);
};

export default useScrollLockEffect;
