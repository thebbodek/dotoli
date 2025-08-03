import { CalendarValue } from '@/components/Calendar';
import useFilterSelectOptionPanel from '@/components/Filter/hooks/useFilterSelectOptionPanel';
import { getCalendarDate } from '@/components/Filter/utils';

const useFilterCalendarPanel = () => {
  const {
    models: { value },
    operations: { handleChange },
  } = useFilterSelectOptionPanel();
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
    const _value = value ? [`${value.startDate}~${value.endDate}`] : null;

    handleChange({ value: _value });
  };

  return {
    models: {
      calendarValue,
    },
    operations: { onChange },
  };
};

export default useFilterCalendarPanel;
