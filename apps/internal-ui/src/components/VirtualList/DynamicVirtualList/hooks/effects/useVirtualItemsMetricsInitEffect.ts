import { useFirstRenderEffect } from '@bbodek/hooks';

import { UseVirtualItemsMetricsInitEffectParams } from '@/components/VirtualList/DynamicVirtualList/hooks/effects/types';

const useVirtualItemsMetricsInitEffect = ({
  itemsTotalCount,
  initialItemHeight,
  gap,
  heightsRef,
  updateOffsets,
}: UseVirtualItemsMetricsInitEffectParams) => {
  useFirstRenderEffect(() => {
    const heights = new Array(itemsTotalCount).fill(initialItemHeight + gap);

    heightsRef.current = heights;
    updateOffsets();
  }, []);
};

export default useVirtualItemsMetricsInitEffect;
