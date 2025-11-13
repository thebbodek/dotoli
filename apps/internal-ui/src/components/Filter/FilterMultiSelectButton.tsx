import FilterSelectButton from '@/components/Filter/FilterSelectButton';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';

const FilterMultiSelectButton = () => {
  const { onChange, onSearch, internalOptions } = useMultiSelectBaseContext();

  const handleClick = () => {
    onSearch({ value: null });
    onChange();
  };

  return (
    <FilterSelectButton
      disabled={
        internalOptions.length === 0 ||
        internalOptions.find(({ isSelected }) => isSelected) === undefined
      }
      onClick={handleClick}
    />
  );
};

export default FilterMultiSelectButton;
