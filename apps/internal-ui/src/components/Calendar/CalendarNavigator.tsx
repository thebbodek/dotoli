import { PropsWithChildren } from 'react';

import { IconButton } from '@/components/Button';
import {
  CALENDAR_NAVIGATE_META_DATA,
  CALENDAR_NAVIGATE_TYPE,
} from '@/components/Calendar/constants';
import { CalendarNavigatorProps } from '@/components/Calendar/types';

const CalendarNavigator = ({
  onYearChange,
  children,
}: PropsWithChildren<CalendarNavigatorProps>) => {
  return (
    <div className='in-tablet:mb-3 text-in-gray-06 in-flex-h-stack-center mb-2 pt-3'>
      <IconButton
        arialLabel={
          CALENDAR_NAVIGATE_META_DATA[CALENDAR_NAVIGATE_TYPE.PREV].LABEL
        }
        iconKey={
          CALENDAR_NAVIGATE_META_DATA[CALENDAR_NAVIGATE_TYPE.PREV].ICON_KEY
        }
        onClick={() =>
          onYearChange({ navigateType: CALENDAR_NAVIGATE_TYPE.PREV })
        }
      />
      {children}
      <IconButton
        arialLabel={
          CALENDAR_NAVIGATE_META_DATA[CALENDAR_NAVIGATE_TYPE.NEXT].LABEL
        }
        iconKey={
          CALENDAR_NAVIGATE_META_DATA[CALENDAR_NAVIGATE_TYPE.NEXT].ICON_KEY
        }
        onClick={() =>
          onYearChange({ navigateType: CALENDAR_NAVIGATE_TYPE.NEXT })
        }
      />
    </div>
  );
};

export default CalendarNavigator;
