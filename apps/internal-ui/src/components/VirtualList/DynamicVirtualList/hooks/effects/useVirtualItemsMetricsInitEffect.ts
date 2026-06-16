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
    heightsRef.current = new Array(itemsTotalCount).fill(
      initialItemHeight + gap,
    );
    updateOffsets();
  }, [itemsTotalCount, initialItemHeight, gap, heightsRef, updateOffsets]);
};

export default useVirtualItemsMetricsInitEffect;
