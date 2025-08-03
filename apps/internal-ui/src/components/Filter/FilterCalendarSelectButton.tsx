import { useCalendarContext } from '@/components/Calendar';
import { isValidDateOfVariant } from '@/components/DatePicker/utils';
import FilterSelectButton from '@/components/Filter/FilterSelectButton';

const FilterCalendarSelectButton = () => {
  const { variant, internalValue, handleChange } = useCalendarContext();
  const _disabled = !isValidDateOfVariant({ value: internalValue, variant });

  return <FilterSelectButton onClick={handleChange} disabled={_disabled} />;
};

export default FilterCalendarSelectButton;
