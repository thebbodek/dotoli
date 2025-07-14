import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

const CalendarWeekly = ({
  children,
  className,
}: PropsWithChildren<Pick<HTMLAttributes<HTMLDivElement>, 'className'>>) => {
  return (
    <div
      role='row'
      className={clsx('grid grid-cols-[repeat(7,_2.8125rem)]', className)}
    >
      {children}
    </div>
  );
};

export default CalendarWeekly;
