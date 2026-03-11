import { useLayoutEffect } from 'react';

import { useDynamicVirtualListContext } from '@/components/VirtualList/DynamicVirtualList/context';
import {
  UpdateHeightParams,
  UseVirtualListItemResizeObserverEffectParams,
} from '@/components/VirtualList/DynamicVirtualList/hooks/effects/types';

const useVirtualListItemResizeObserverEffect = ({
  ref,
  dataIndex,
}: UseVirtualListItemResizeObserverEffectParams) => {
  const { heightsRef, gap, updateOffsets } = useDynamicVirtualListContext();

  const updateHeight = ({ height }: UpdateHeightParams) => {
    const newHeight = height + gap;
    const oldHeight = heightsRef.current[dataIndex];

    if (oldHeight === newHeight) return;

    heightsRef.current[dataIndex] = newHeight;
    updateOffsets();
  };

  useLayoutEffect(() => {
    const item = ref.current;

    if (!item) return;

    const observer = new ResizeObserver((entries) => {
      const [boxSize] = entries[0].borderBoxSize;

      updateHeight({ height: boxSize.blockSize });
    });
    observer.observe(item);

    return () => {
      observer.disconnect();
    };
  }, [ref, dataIndex, gap]);
};

export default useVirtualListItemResizeObserverEffect;
