import { Button, BUTTON_SIZES, BUTTON_THEMES } from '@/components/Button';
import { CALENDAR_VARIANTS, useCalendarContext } from '@/components/Calendar';
import { DatePickerSelectButtonProps } from '@/components/DatePicker/types';
import { isValidDateOfVariant } from '@/components/DatePicker/utils';

const DatePickerSelectButton = ({ close }: DatePickerSelectButtonProps) => {
  const { variant, onChange, internalValue } = useCalendarContext();
  const disabled = !isValidDateOfVariant({ value: internalValue, variant });

  const handleClick = () => {
    const value = () => {
      if (internalValue == null) return null;

      const { startDate, endDate } = internalValue;
      const formattedStartDate = startDate?.format('YYYY-MM-DD') ?? null;
      const formattedEndDate = endDate?.format('YYYY-MM-DD') ?? null;

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
    close();
  };

  return (
    <div className='border-t-in-gray-02 border-t p-4'>
      <Button
        label='선택 완료'
        theme={BUTTON_THEMES.PRIMARY}
        size={BUTTON_SIZES.SM}
        onClick={handleClick}
        className='w-full'
        disabled={disabled}
      />
    </div>
  );
};

export default DatePickerSelectButton;
