import { useEffect } from 'react';

import { UseCalculateContainerHeightEffectProps } from '@/components/VirtualList/shared/hooks/effects/types';

const useCalculateContainerHeightEffect = ({
  containerRef,
  setContainerHeight,
}: UseCalculateContainerHeightEffectProps) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const calculateContainerHeight = () => {
      setContainerHeight(container.clientHeight);
    };

    calculateContainerHeight();

    const observer = new ResizeObserver(calculateContainerHeight);
    observer.observe(container);

    return () => observer.disconnect();
  }, [containerRef, setContainerHeight]);
};

export default useCalculateContainerHeightEffect;
