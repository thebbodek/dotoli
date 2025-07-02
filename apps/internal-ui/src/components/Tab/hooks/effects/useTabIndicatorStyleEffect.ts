import { useEffect } from 'react';

import { UseTabIndicatorStyleProps } from '@/components/Tab/types';

const useTabIndicatorStyleEffect = ({
  tabRefs,
  currentValue,
  setStyle,
}: UseTabIndicatorStyleProps) => {
  const resetStyle = () => setStyle({ display: 'none' });

  useEffect(() => {
    const current = tabRefs.current[currentValue];

    const setIndicatorStyle = () => {
      if (!current) {
        resetStyle();
        return;
      }

      const { offsetWidth: width, offsetLeft } = current;

      setStyle({
        width,
        transform: `translateX(${offsetLeft}px)`,
        display: 'block',
      });
    };

    const observer = new ResizeObserver(setIndicatorStyle);

    setIndicatorStyle();
    observer.observe(document.body);
    current && observer.observe(current);

    return () => {
      resetStyle();
      observer.disconnect();
    };
  }, [tabRefs.current, currentValue]);
};

export default useTabIndicatorStyleEffect;
