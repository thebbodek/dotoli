import { PropsWithChildren } from 'react';

import CalendarWeekly from '@/components/Calendar/CalendarWeekly';

const CalendarDays = ({ children }: PropsWithChildren) => {
  return (
    <CalendarWeekly className='grid-rows-[2.8125rem]'>
      {children}
    </CalendarWeekly>
  );
};

export default CalendarDays;
