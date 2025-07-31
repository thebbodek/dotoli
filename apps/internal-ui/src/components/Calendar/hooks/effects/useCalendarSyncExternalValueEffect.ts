import { date } from '@bbodek/utils';
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
            startDate: value.startDate
              ? date.toParseDateType({ type: 'dayjs', date: value.startDate })
              : null,
            endDate: value.endDate
              ? date.toParseDateType({ type: 'dayjs', date: value.endDate })
              : null,
          };

    setInternalValue(normalizedValue);
  }, [value]);
};

export default useCalendarSyncExternalValueEffect;
