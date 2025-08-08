import dayjs from 'dayjs';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

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

  const setCalendarInternalValue = useCallback(() => {
    const normalizedValue =
      value === null
        ? null
        : {
            startDate: value.startDate ? dayjs(value.startDate) : null,
            endDate: value.endDate ? dayjs(value.endDate) : null,
          };

    setInternalValue(normalizedValue);
  }, [value]);

  const contextValue = {
    value,
    internalValue,
    variant,
    onChange,
    setInternalValue,
    setCalendarInternalValue,
  };

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
