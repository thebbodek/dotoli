import { toParseDateType, toString } from '@bbodek/utils';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { CALENDAR_VARIANTS } from '@/components/Calendar/constants';
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

  const handleChange = () => {
    const value = () => {
      if (internalValue === null) return null;

      const { startDate, endDate } = internalValue;
      const formattedStartDate =
        startDate !== null ? toString({ date: startDate }) : null;
      const formattedEndDate =
        endDate !== null ? toString({ date: endDate }) : null;

      if (variant === CALENDAR_VARIANTS.UNBOUNDED) {
        return {
          startDate: formattedStartDate,
          endDate: null,
        };
      }

      return {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };
    };

    onChange(value());
  };

  const internalValueStrings = useMemo(() => {
    const { startDate = null, endDate = null } = internalValue ?? {};

    return {
      startDateString:
        startDate !== null ? toString({ date: startDate }) : null,
      endDateString: endDate !== null ? toString({ date: endDate }) : null,
    };
  }, [internalValue]);

  const setCalendarInternalValue = useCallback(() => {
    const normalizedValue =
      value === null
        ? null
        : {
            startDate: value.startDate
              ? toParseDateType({ date: value.startDate, type: 'dayjs' })
              : null,
            endDate: value.endDate
              ? toParseDateType({ date: value.endDate, type: 'dayjs' })
              : null,
          };

    setInternalValue(normalizedValue);
  }, [value]);

  const contextValue = {
    value,
    internalValue,
    internalValueStrings,
    variant,
    onChange,
    handleChange,
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
