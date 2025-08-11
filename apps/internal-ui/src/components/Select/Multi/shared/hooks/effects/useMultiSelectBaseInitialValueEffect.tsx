import { useEffect } from 'react';

import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';

const useMultiSelectBaseInitialValueEffect = () => {
  const { setMultiSelectInternalOptions } = useMultiSelectBaseContext();

  useEffect(() => {
    setMultiSelectInternalOptions();
  }, []);
};

export default useMultiSelectBaseInitialValueEffect;
