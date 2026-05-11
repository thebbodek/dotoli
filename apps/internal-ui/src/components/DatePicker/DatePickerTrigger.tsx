import { toString } from '@bbodek/utils';

import { CALENDAR_VARIANTS, useCalendarContext } from '@/components/Calendar';
import { DatePickerWrapperProps } from '@/components/DatePicker/types';
import { isValidDateOfVariant } from '@/components/DatePicker/utils';
import { Icon } from '@/components/Icon';
import {
  SelectBaseTriggerWrapper,
  useSelectTriggerContext,
} from '@/components/Select/shared';
import SelectBaseDisplayValue from '@/components/Select/shared/SelectBaseDisplayValue';
import SelectBaseResetButton from '@/components/Select/shared/SelectBaseResetButton';

const DatePickTrigger = ({
  format,
}: Pick<DatePickerWrapperProps, 'format'>) => {
  const { placeholder = '', disabled } = useSelectTriggerContext();
  const { value, variant, setInternalValue, onChange } = useCalendarContext();
  const hasValue = !!value && isValidDateOfVariant({ value, variant });
  const showsResetButton = hasValue && !disabled;

  const onReset = () => {
    setInternalValue(null);
    onChange(null);
  };

  const displayValue = () => {
    if (!value) return placeholder;

    const { startDate, endDate } = value;
    const startDateFormatted = toString({ date: startDate!, format });

    if (
      variant === CALENDAR_VARIANTS.SINGLE &&
      isValidDateOfVariant({ value, variant: CALENDAR_VARIANTS.SINGLE })
    ) {
      return startDateFormatted;
    }

    if (
      variant === CALENDAR_VARIANTS.RANGE &&
      isValidDateOfVariant({ value, variant: CALENDAR_VARIANTS.RANGE })
    ) {
      return `${startDateFormatted} ~ ${toString({ date: endDate!, format })}`;
    }

    if (
      variant === CALENDAR_VARIANTS.UNBOUNDED &&
      isValidDateOfVariant({ value, variant: CALENDAR_VARIANTS.UNBOUNDED })
    ) {
      return `${startDateFormatted} 부터`;
    }

    return placeholder;
  };

  return (
    <SelectBaseTriggerWrapper
      subFixIcon={<Icon className='text-[1.125rem]' iconKey='calendar-dots' />}
    >
      <SelectBaseDisplayValue
        displayValue={displayValue()}
        hasValue={hasValue}
      />
      {showsResetButton && <SelectBaseResetButton onClick={onReset} />}
    </SelectBaseTriggerWrapper>
  );
};

export default DatePickTrigger;
