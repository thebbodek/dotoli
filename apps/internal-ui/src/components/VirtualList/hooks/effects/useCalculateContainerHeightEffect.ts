import { useEffect } from 'react';

import { UseCalculateContainerHeightEffectProps } from '@/components/VirtualList/types';

const useCalculateContainerHeightEffect = ({
  containerRef,
  setContainerHeight,
}: UseCalculateContainerHeightEffectProps) => {
  useEffect(() => {
    const calculateContainerHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    calculateContainerHeight();

    window.addEventListener('resize', calculateContainerHeight);

    return () => {
      window.removeEventListener('resize', calculateContainerHeight);
    };
  }, [containerRef, setContainerHeight]);
};

export default useCalculateContainerHeightEffect;
