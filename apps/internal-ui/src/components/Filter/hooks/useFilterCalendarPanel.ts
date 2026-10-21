import { CalendarValue } from '@/components/Calendar';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import useFilterSelectOptionPanel from '@/components/Filter/hooks/useFilterSelectOptionPanel';
import { UseFilterCalendarPanelParams } from '@/components/Filter/types';
import {
  getCalendarDate,
  getCalendarFilterValue,
} from '@/components/Filter/utils';

const useFilterCalendarPanel = ({ variant }: UseFilterCalendarPanelParams) => {
  const {
    models: { value },
    operations: { handleChange },
  } = useFilterSelectOptionPanel();
  const { currentOptions } = useFilterPanelContext();
  const { dateOption } = currentOptions!;
  const { minDate, maxDate, useWeekend } = dateOption ?? {};
  const { startDate, endDate } =
    value !== null
      ? getCalendarDate({ value })
      : { startDate: null, endDate: null };
  const calendarValue =
    value !== null
      ? {
          startDate: startDate,
          endDate: endDate,
        }
      : null;

  const onChange = (value: CalendarValue) => {
    handleChange({ value: getCalendarFilterValue({ value, variant }) });
  };

  return {
    models: {
      calendarValue,
      minDate,
      maxDate,
      useWeekend,
    },
    operations: { onChange },
  };
};

export default useFilterCalendarPanel;
