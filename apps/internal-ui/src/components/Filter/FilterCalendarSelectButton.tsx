import { toString } from '@bbodek/utils';

import { useCalendarContext } from '@/components/Calendar';
import { isValidDateOfVariant } from '@/components/DatePicker/utils';
import FilterSelectButton from '@/components/Filter/FilterSelectButton';

const FilterCalendarSelectButton = () => {
  const { variant, internalValue, onChange } = useCalendarContext();
  const _disabled = !isValidDateOfVariant({ value: internalValue, variant });

  const handleClick = () => {
    const value = () => {
      if (internalValue == null) return null;

      const { startDate, endDate } = internalValue;
      const formattedStartDate =
        startDate !== null ? toString({ date: startDate }) : null;
      const formattedEndDate =
        endDate !== null ? toString({ date: endDate }) : null;

      return {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };
    };

    onChange(value());
  };

  return <FilterSelectButton onClick={handleClick} disabled={_disabled} />;
};

export default FilterCalendarSelectButton;
