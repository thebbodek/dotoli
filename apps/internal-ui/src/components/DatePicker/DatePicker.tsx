import { useId } from 'react';

import {
  Calendar,
  CALENDAR_VARIANTS,
  CalendarProvider,
} from '@/components/Calendar';
import DatePickerSelectButton from '@/components/DatePicker/DatePickerSelectButton';
import DatePickerWrapper from '@/components/DatePicker/DatePickerWrapper';
import { DatePickerProps } from '@/components/DatePicker/types';
import { Flex } from '@/components/Flex';
import { SELECT_TYPE, SelectBase } from '@/components/Select/shared';

const DatePicker = ({
  className,
  badge,
  label,
  hiddenLabel,
  disabled,
  feedback,
  required,
  isError,
  placeholder,
  value,
  popoverOption,
  variant,
  minDate,
  maxDate,
  holidays,
  disabledDays,
  externalDaysLabels,
  onChange,
}: DatePickerProps) => {
  const labelId = useId();
  const calendarId = useId();

  return (
    <CalendarProvider value={value} variant={variant} onChange={onChange}>
      <DatePickerWrapper
        label={
          <SelectBase.Label badge={badge} hidden={hiddenLabel} label={label} />
        }
        type={
          variant === CALENDAR_VARIANTS.SINGLE
            ? SELECT_TYPE.SELECT
            : SELECT_TYPE.MULTI_SEARCH_SELECT
        }
        className={className}
        controls={calendarId}
        disabled={disabled}
        feedback={feedback}
        isError={isError}
        labelId={labelId}
        placeholder={placeholder}
        popoverOption={popoverOption}
        required={required}
      >
        {({ close }) => (
          <SelectBase.PopoverWrapper useMobile>
            <Flex
              className='in-tablet:min-w-[23.75rem] in-tablet:max-w-full in-tablet:min-h-[34svh] in-tablet:max-h-[46svh] in-tablet:w-auto mx-auto h-full w-full max-w-[26.875rem] min-w-[22.5rem] justify-between'
              direction='column'
            >
              <Calendar
                className='in-tablet:min-h-[calc(34svh-4.125rem)] in-tablet:max-h-[calc(46svh-4.125rem)] mx-auto'
                disabledDays={disabledDays}
                externalDaysLabels={externalDaysLabels}
                holidays={holidays}
                id={calendarId}
                labelId={labelId}
                maxDate={maxDate}
                minDate={minDate}
              />
              <DatePickerSelectButton close={close} />
            </Flex>
          </SelectBase.PopoverWrapper>
        )}
      </DatePickerWrapper>
    </CalendarProvider>
  );
};

export default DatePicker;
