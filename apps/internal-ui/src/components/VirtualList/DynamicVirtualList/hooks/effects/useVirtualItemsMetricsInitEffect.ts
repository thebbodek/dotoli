import { useEffect, useRef } from 'react';

import { UseVirtualItemsMetricsInitEffectParams } from '@/components/VirtualList/DynamicVirtualList/hooks/effects/types';

const useVirtualItemsMetricsInitEffect = ({
  itemsTotalCount,
  initialItemHeight,
  gap,
  heightsRef,
  updateOffsets,
}: UseVirtualItemsMetricsInitEffectParams) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      const heights = new Array(itemsTotalCount).fill(initialItemHeight + gap);

      heightsRef.current = heights;
      updateOffsets();
    }
  }, []);
};

export default useVirtualItemsMetricsInitEffect;
