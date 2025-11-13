import { useEffect } from 'react';

import { useTabContext } from '@/components/Tab/context';
import { UseTabIndicatorStyleProps } from '@/components/Tab/types';

const useTabIndicatorStyleEffect = ({
  setStyle,
}: UseTabIndicatorStyleProps) => {
  const { tabRefs, currentValue } = useTabContext();

  const resetStyle = () => setStyle({ opacity: 0 });

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
        opacity: 1,
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
