import { PropsWithChildren } from 'react';

import CalendarWeekly from '@/components/Calendar/CalendarWeekly';

const CalendarWeeks = ({ children }: PropsWithChildren) => {
  return (
    <CalendarWeekly className='border-b-in-gray-01 in-tablet:mb-3 mb-2 h-[1.625rem] border-b px-4'>
      {children}
    </CalendarWeekly>
  );
};

export default CalendarWeeks;
