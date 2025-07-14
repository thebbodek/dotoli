import dayjs from 'dayjs';
import { useEffect } from 'react';

import { UseCalendarSyncExternalValueEffectProps } from '@/components/Calendar/types';

const useCalendarSyncExternalValueEffect = ({
  value,
  setInternalValue,
}: UseCalendarSyncExternalValueEffectProps) => {
  useEffect(() => {
    const normalizedValue =
      value === null
        ? null
        : {
            startDate: value.startDate ? dayjs(value.startDate) : null,
            endDate: value.endDate ? dayjs(value.endDate) : null,
          };

    setInternalValue(normalizedValue);
  }, [value]);
};

export default useCalendarSyncExternalValueEffect;
