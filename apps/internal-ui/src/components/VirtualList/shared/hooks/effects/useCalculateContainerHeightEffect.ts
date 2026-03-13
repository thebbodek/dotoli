import { useEffect } from 'react';

import { UseCalculateContainerHeightEffectProps } from '@/components/VirtualList/shared/hooks/effects/types';

const useCalculateContainerHeightEffect = ({
  containerRef,
  setContainerHeight,
}: UseCalculateContainerHeightEffectProps) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const { clientHeight } = containerRef.current;

    const calculateContainerHeight = () => {
      setContainerHeight(clientHeight);
    };

    calculateContainerHeight();

    const observer = new ResizeObserver(calculateContainerHeight);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef, setContainerHeight]);
};

export default useCalculateContainerHeightEffect;
