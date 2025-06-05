import { useEffect } from 'react';

const useBodyScrollLockEffect = (deps: boolean) => {
  useEffect(() => {
    if (deps) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => document.body.classList.remove('overflow-hidden');
  }, [deps]);
};

export default useBodyScrollLockEffect;
