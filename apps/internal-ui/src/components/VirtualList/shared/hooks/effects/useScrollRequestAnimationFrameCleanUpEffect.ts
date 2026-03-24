import { useEffect } from 'react';

import { UseScrollRequestAnimationFrameCleanUpEffectProps } from '@/components/VirtualList/shared/hooks/effects/types';

const useScrollRequestAnimationFrameCleanUpEffect = ({
  scrollRafId,
}: UseScrollRequestAnimationFrameCleanUpEffectProps) => {
  useEffect(() => {
    return () => {
      cancelAnimationFrame(scrollRafId.current);
    };
  }, []);
};

export default useScrollRequestAnimationFrameCleanUpEffect;
