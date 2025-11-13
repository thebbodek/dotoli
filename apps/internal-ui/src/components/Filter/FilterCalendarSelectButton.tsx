import { useCalendarContext } from '@/components/Calendar';
import { isValidDateOfVariant } from '@/components/DatePicker/utils';
import FilterSelectButton from '@/components/Filter/FilterSelectButton';

const FilterCalendarSelectButton = () => {
  const { variant, internalValue, handleChange } = useCalendarContext();
  const isDisabled = !isValidDateOfVariant({ value: internalValue, variant });

  return <FilterSelectButton disabled={isDisabled} onClick={handleChange} />;
};

export default FilterCalendarSelectButton;
