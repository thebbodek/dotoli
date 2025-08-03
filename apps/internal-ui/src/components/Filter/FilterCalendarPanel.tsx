import { useId } from 'react';

import { Calendar, CalendarProvider } from '@/components/Calendar';
import FilterCalendarSelectButton from '@/components/Filter/FilterCalendarSelectButton';
import useFilterCalendarPanel from '@/components/Filter/hooks/useFilterCalendarPanel';
import { FilterCalendarPanelProps } from '@/components/Filter/types';
import { Flex } from '@/components/Flex';

const FilterCalendarPanel = ({ variant }: FilterCalendarPanelProps) => {
  const labelId = useId();
  const calendarId = useId();
  const {
    models: { calendarValue },
    operations: { onChange },
  } = useFilterCalendarPanel();

  return (
    <CalendarProvider
      value={calendarValue}
      variant={variant}
      onChange={onChange}
    >
      <Flex
        direction='column'
        className='in-tablet:min-w-[23.75rem] mx-auto w-[22.5rem] justify-between overflow-hidden'
      >
        <Calendar
          className='in-tablet:min-h-[34svh-3.75rem] in-tablet:max-h-[46svh-3.75rem] mx-auto h-[100svh-4rem]'
          id={calendarId}
          labelId={labelId}
        />
        <FilterCalendarSelectButton />
      </Flex>
    </CalendarProvider>
  );
};

export default FilterCalendarPanel;
