import { useEffect } from 'react';

import { UseVirtualItemsMetricsInitEffectParams } from '@/components/VirtualList/DynamicVirtualList/hooks/effects/types';

const useVirtualItemsMetricsInitEffect = ({
  itemsTotalCount,
  initialItemHeight,
  gap,
  heightsRef,
  updateOffsets,
}: UseVirtualItemsMetricsInitEffectParams) => {
  useEffect(() => {
    const prevHeights = heightsRef.current;
    const estimatedItemHeight = initialItemHeight + gap;

    heightsRef.current = Array.from(
      { length: itemsTotalCount },
      (_, index) => prevHeights[index] ?? estimatedItemHeight,
    );
    updateOffsets();
  }, [itemsTotalCount, initialItemHeight, gap, heightsRef, updateOffsets]);
};

export default useVirtualItemsMetricsInitEffect;
