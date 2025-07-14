import { createContext, PropsWithChildren, useContext, useState } from 'react';

import useCalendarSyncExternalValueEffect from '@/components/Calendar/hooks/effects/useCalendarSyncExternalValueEffect';
import {
  CalendarContextProviderProps,
  CalendarContextValue,
} from '@/components/Calendar/types';

const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined,
);

export const CalendarProvider = ({
  value,
  variant,
  onChange,
  children,
}: PropsWithChildren<CalendarContextProviderProps>) => {
  const [internalValue, setInternalValue] =
    useState<CalendarContextValue['internalValue']>(null);

  const contextValue = {
    value,
    internalValue,
    variant,
    onChange,
    setInternalValue,
  };

  useCalendarSyncExternalValueEffect({
    value,
    setInternalValue,
  });

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarProvider',
    );
  }

  return context;
};
