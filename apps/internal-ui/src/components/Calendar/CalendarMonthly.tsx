import { PropsWithChildren } from 'react';

import { CalendarMonthlyProps } from '@/components/Calendar/types';

const CalendarMonthly = ({
  children,
  setRef,
}: PropsWithChildren<CalendarMonthlyProps>) => {
  return (
    <div
      ref={setRef}
      role='rowgroup'
      className='in-flex-v-stack gap-y-1.5 px-4'
    >
      {children}
    </div>
  );
};

export default CalendarMonthly;
