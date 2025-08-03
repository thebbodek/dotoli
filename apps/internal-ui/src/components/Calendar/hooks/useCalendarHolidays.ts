import { toString } from '@bbodek/utils';
import { useMemo } from 'react';

import { UseCalendarHolidaysProps } from '@/components/Calendar/types';

const useCalendarHolidays = ({ holidays }: UseCalendarHolidaysProps) => {
  const holidaysSet = useMemo(
    () =>
      new Set(holidays?.map((holiday) => toString({ date: holiday })) ?? []),
    [holidays],
  );

  return {
    holidaysSet,
  };
};

export default useCalendarHolidays;
