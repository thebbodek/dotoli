import { useEffect, useRef } from 'react';

const useFirstRenderEffect: typeof useEffect = (effect) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      effect();
    }
  }, []);
};

export default useFirstRenderEffect;
