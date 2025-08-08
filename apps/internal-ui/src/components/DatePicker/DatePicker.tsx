import { useId } from 'react';

import {
  Calendar,
  CALENDAR_VARIANTS,
  CalendarProvider,
} from '@/components/Calendar';
import DatePickerSelectButton from '@/components/DatePicker/DatePickerSelectButton';
import DatePickerTrigger from '@/components/DatePicker/DatePickerTrigger';
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
      <SelectBase
        className={className}
        type={
          variant === CALENDAR_VARIANTS.SINGLE
            ? SELECT_TYPE.SELECT
            : SELECT_TYPE.MULTI_SEARCH_SELECT
        }
        label={
          <SelectBase.Label
            badge={badge}
            label={label}
            hiddenLabel={hiddenLabel}
          />
        }
        trigger={<DatePickerTrigger />}
        disabled={disabled}
        feedback={feedback}
        required={required}
        isError={isError}
        placeholder={placeholder}
        controls={calendarId}
        labelId={labelId}
        popoverOption={{
          ...popoverOption,
          useClickOutsideEvent: false,
        }}
      >
        {({ close }) => (
          <SelectBase.PopoverWrapper useMobile>
            <Flex
              direction='column'
              className='in-tablet:min-w-[23.75rem] in-tablet:max-w-full in-tablet:min-h-[34svh] in-tablet:max-h-[46svh] in-tablet:w-auto mx-auto h-full w-full min-w-[22.5rem] max-w-[26.875rem] justify-between'
            >
              <Calendar
                className='in-tablet:min-h-[calc(34svh-4.125rem)] in-tablet:max-h-[calc(46svh-4.125rem)] mx-auto'
                id={calendarId}
                labelId={labelId}
                minDate={minDate}
                maxDate={maxDate}
                holidays={holidays}
                disabledDays={disabledDays}
                externalDaysLabels={externalDaysLabels}
              />
              <DatePickerSelectButton close={close} />
            </Flex>
          </SelectBase.PopoverWrapper>
        )}
      </SelectBase>
    </CalendarProvider>
  );
};

export default DatePicker;
