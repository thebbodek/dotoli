import { useEffect } from 'react';

import { UseVirtualListUpdateOffsetsCancelAnimationFrameEffectParams } from '@/components/VirtualList/DynamicVirtualList/hooks/effects/types';

const useVirtualListUpdateOffsetsCancelAnimationFrameEffect = ({
  rafIdRef,
}: UseVirtualListUpdateOffsetsCancelAnimationFrameEffectParams) => {
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);
};

export default useVirtualListUpdateOffsetsCancelAnimationFrameEffect;
