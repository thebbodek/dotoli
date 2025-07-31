import CalendarWeek from '@/components/Calendar/CalendarWeek';
import CalendarWeekly from '@/components/Calendar/CalendarWeekly';
import { WEEKS } from '@/components/Calendar/constants';

const CalendarWeeks = () => {
  return (
    <CalendarWeekly className='border-b-in-gray-01 in-tablet:mb-3 mb-2 h-[1.625rem] border-b px-4'>
      {WEEKS.map((week) => (
        <CalendarWeek key={week} week={week} />
      ))}
    </CalendarWeekly>
  );
};

export default CalendarWeeks;
