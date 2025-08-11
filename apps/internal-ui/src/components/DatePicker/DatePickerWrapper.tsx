import { useCalendarContext } from '@/components/Calendar/context/useCalendarContext';
import DatePickerTrigger from '@/components/DatePicker/DatePickerTrigger';
import { DatePickerWrapperProps } from '@/components/DatePicker/types';
import { SelectBase } from '@/components/Select/shared';

const DatePickerWrapper = ({
  className,
  type,
  label,
  disabled,
  feedback,
  required,
  isError,
  placeholder,
  controls,
  labelId,
  popoverOption,
  children,
}: DatePickerWrapperProps) => {
  const { setCalendarInternalValue } = useCalendarContext();

  const _popoverOption = {
    ...(popoverOption ?? {}),
    onPopoverClose: () => {
      popoverOption?.onPopoverClose?.();
      setCalendarInternalValue();
    },
  };

  return (
    <SelectBase
      className={className}
      type={type}
      label={label}
      trigger={<DatePickerTrigger />}
      disabled={disabled}
      feedback={feedback}
      required={required}
      isError={isError}
      placeholder={placeholder}
      controls={controls}
      labelId={labelId}
      popoverOption={_popoverOption}
    >
      {children}
    </SelectBase>
  );
};

export default DatePickerWrapper;
