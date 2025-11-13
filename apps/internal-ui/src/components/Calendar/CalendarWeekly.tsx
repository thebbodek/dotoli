import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

const CalendarWeekly = ({
  children,
  className,
}: PropsWithChildren<Pick<HTMLAttributes<HTMLDivElement>, 'className'>>) => {
  return (
    <div
      className={clsx('grid grid-cols-[repeat(7,_2.8125rem)]', className)}
      role='row'
    >
      {children}
    </div>
  );
};

export default CalendarWeekly;
