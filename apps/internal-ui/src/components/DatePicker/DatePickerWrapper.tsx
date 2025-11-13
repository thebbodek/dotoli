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
      controls={controls}
      disabled={disabled}
      feedback={feedback}
      isError={isError}
      label={label}
      labelId={labelId}
      placeholder={placeholder}
      popoverOption={_popoverOption}
      required={required}
      trigger={<DatePickerTrigger />}
      type={type}
    >
      {children}
    </SelectBase>
  );
};

export default DatePickerWrapper;
