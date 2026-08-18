import { useEffect } from 'react';

import { UseScrollLockEffectProps } from '@/components/shared/Overlay/types';

let lockCount = 0;
let previousOverflow = '';

export const useScrollLockEffect = ({ isLocked }: UseScrollLockEffectProps) => {
  useEffect(() => {
    if (!isLocked) return;

    const { body } = document;

    if (lockCount === 0) {
      previousOverflow = body.style.overflow;
      body.style.overflow = 'hidden';
    }

    lockCount += 1;

    return () => {
      lockCount -= 1;

      if (lockCount === 0) {
        body.style.overflow = previousOverflow;
      }
    };
  }, [isLocked]);
};
