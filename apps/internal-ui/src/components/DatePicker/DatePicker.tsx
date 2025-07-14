import { useId } from 'react';

import {
  Calendar,
  CALENDAR_VARIANTS,
  CalendarProvider,
} from '@/components/Calendar';
import DatePickerSelectButton from '@/components/DatePicker/DatePickerSelectButton';
import DatePickerTrigger from '@/components/DatePicker/DatePickerTrigger';
import { DatePickerProps } from '@/components/DatePicker/types';
import { SELECT_TYPE, SelectBase } from '@/components/Select/shared';

const DatePicker = ({
  className,
  badge,
  label,
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
        label={<SelectBase.Label badge={badge}>{label}</SelectBase.Label>}
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
          <SelectBase.PopoverWrapper className='in-tablet:min-h-[34svh] in-flex-v-stack in-tablet:max-h-[46svh] in-tablet:static in-tablet:inset-auto fixed inset-0 min-w-[23.75rem] items-center'>
            <Calendar
              className='in-tablet:min-h-[calc(34svh-4.125rem)] in-tablet:max-h-[calc(46svh-4.125rem)]'
              id={calendarId}
              labelId={labelId}
              minDate={minDate}
              maxDate={maxDate}
              holidays={holidays}
              disabledDays={disabledDays}
              externalDaysLabels={externalDaysLabels}
            />
            <DatePickerSelectButton close={close} />
          </SelectBase.PopoverWrapper>
        )}
      </SelectBase>
    </CalendarProvider>
  );
};

export default DatePicker;
