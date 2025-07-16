import { useEffect } from 'react';

import { UseClickOutSideEffectProps } from '@/hooks/useClickOutSide/types';

const useClickOutSideEffect = <T extends HTMLElement>({
  ref,
  onClose,
  useClickOutsideEvent = true,
}: UseClickOutSideEffectProps<T>) => {
  useEffect(() => {
    const onClickOutSide = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;

      onClose(e);
    };

    if (useClickOutsideEvent) {
      document.addEventListener('mousedown', onClickOutSide);
    } else {
      document.removeEventListener('mousedown', onClickOutSide);
    }

    return () => {
      if (useClickOutsideEvent) {
        document.removeEventListener('mousedown', onClickOutSide);
      }
    };
  }, [ref.current, useClickOutsideEvent]);
};

export default useClickOutSideEffect;
