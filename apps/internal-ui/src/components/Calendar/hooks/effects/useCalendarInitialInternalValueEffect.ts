import { useEffect } from 'react';

import { useCalendarContext } from '@/components/Calendar/context';

const useCalendarInitialInternalValueEffect = () => {
  const { setCalendarInternalValue } = useCalendarContext();

  useEffect(() => {
    setCalendarInternalValue();
  }, []);
};

export default useCalendarInitialInternalValueEffect;
