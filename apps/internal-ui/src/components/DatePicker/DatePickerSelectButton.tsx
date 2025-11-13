import { Button, BUTTON_SIZES, BUTTON_THEMES } from '@/components/Button';
import { useCalendarContext } from '@/components/Calendar';
import { DatePickerSelectButtonProps } from '@/components/DatePicker/types';
import { isValidDateOfVariant } from '@/components/DatePicker/utils';

const DatePickerSelectButton = ({
  close,
  disabled,
}: DatePickerSelectButtonProps) => {
  const { variant, handleChange, internalValue } = useCalendarContext();
  const isDisabled =
    disabled || !isValidDateOfVariant({ value: internalValue, variant });

  const handleClick = () => {
    handleChange();
    close();
  };

  return (
    <div className='border-t-in-gray-02 w-full border-t p-4'>
      <Button
        className='w-full'
        disabled={isDisabled}
        label='선택 완료'
        size={BUTTON_SIZES.SM}
        theme={BUTTON_THEMES.PRIMARY}
        onClick={handleClick}
      />
    </div>
  );
};

export default DatePickerSelectButton;
