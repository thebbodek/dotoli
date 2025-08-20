import { Button, BUTTON_SIZES, BUTTON_THEMES } from '@/components/Button';
import { useCalendarContext } from '@/components/Calendar';
import { DatePickerSelectButtonProps } from '@/components/DatePicker/types';
import { isValidDateOfVariant } from '@/components/DatePicker/utils';

const DatePickerSelectButton = ({
  close,
  disabled,
}: DatePickerSelectButtonProps) => {
  const { variant, handleChange, internalValue } = useCalendarContext();
  const _disabled =
    disabled || !isValidDateOfVariant({ value: internalValue, variant });

  const handleClick = () => {
    handleChange();
    close();
  };

  return (
    <div className='border-t-in-gray-02 w-full border-t p-4'>
      <Button
        label='선택 완료'
        theme={BUTTON_THEMES.PRIMARY}
        size={BUTTON_SIZES.SM}
        onClick={handleClick}
        className='w-full'
        disabled={_disabled}
      />
    </div>
  );
};

export default DatePickerSelectButton;
