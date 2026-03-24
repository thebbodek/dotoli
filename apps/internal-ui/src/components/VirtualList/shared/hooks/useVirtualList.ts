import { UIEvent, useCallback, useRef, useState } from 'react';

import {
  useCalculateContainerHeightEffect,
  useScrollRequestAnimationFrameCleanUpEffect,
} from '@/components/VirtualList/shared/hooks/effects';
import { UseVirtualListReturnType } from '@/components/VirtualList/shared/hooks/types';

const useVirtualList = (): UseVirtualListReturnType => {
  const containerRef = useRef<HTMLElement | null>(null);
  const scrollRafId = useRef<number>(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const onScroll = useCallback((e: UIEvent<HTMLElement>) => {
    const currentScrollTop = e.currentTarget.scrollTop;

    if (scrollRafId.current) {
      cancelAnimationFrame(scrollRafId.current);
    }

    scrollRafId.current = requestAnimationFrame(() => {
      setScrollTop(currentScrollTop);
    });
  }, []);

  useCalculateContainerHeightEffect({ containerRef, setContainerHeight });
  useScrollRequestAnimationFrameCleanUpEffect({ scrollRafId });

  return {
    models: { containerRef, scrollTop, containerHeight },
    operations: { onScroll },
  };
};

export default useVirtualList;
