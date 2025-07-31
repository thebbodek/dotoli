import { date } from '@bbodek/utils';

import { CALENDAR_VARIANTS, useCalendarContext } from '@/components/Calendar';
import { isValidDateOfVariant } from '@/components/DatePicker/utils';
import { Icon } from '@/components/Icon';
import {
  SelectBaseTriggerWrapper,
  useSelectTriggerContext,
} from '@/components/Select/shared';
import SelectBaseDisplayValue from '@/components/Select/shared/SelectBaseDisplayValue';
import SelectBaseResetButton from '@/components/Select/shared/SelectBaseResetButton';

const DatePickTrigger = () => {
  const { placeholder = '', disabled } = useSelectTriggerContext();
  const { value, variant, setInternalValue, onChange } = useCalendarContext();
  const hasValue = !!value && isValidDateOfVariant({ value, variant });
  const showResetButton = hasValue && !disabled;

  const onReset = () => {
    setInternalValue(null);
    onChange(null);
  };

  const displayValue = () => {
    if (!value) return placeholder;

    const { startDate, endDate } = value;

    if (
      variant === CALENDAR_VARIANTS.SINGLE &&
      isValidDateOfVariant({ value, variant: CALENDAR_VARIANTS.SINGLE })
    ) {
      return date.toString({ date: startDate! });
    }

    if (
      variant === CALENDAR_VARIANTS.RANGE &&
      isValidDateOfVariant({ value, variant: CALENDAR_VARIANTS.RANGE })
    ) {
      return `${date.toString({ date: startDate! })} ~ ${date.toString({ date: endDate! })}`;
    }

    if (
      variant === CALENDAR_VARIANTS.UNBOUNDED &&
      isValidDateOfVariant({ value, variant: CALENDAR_VARIANTS.UNBOUNDED })
    ) {
      return `${date.toString({ date: startDate! })} 부터`;
    }

    return placeholder;
  };

  return (
    <SelectBaseTriggerWrapper
      subFixIcon={<Icon iconKey='calendar-dots' className='text-[1.125rem]' />}
    >
      <SelectBaseDisplayValue
        displayValue={displayValue()}
        hasValue={hasValue}
      />
      {showResetButton && <SelectBaseResetButton onClick={onReset} />}
    </SelectBaseTriggerWrapper>
  );
};

export default DatePickTrigger;
