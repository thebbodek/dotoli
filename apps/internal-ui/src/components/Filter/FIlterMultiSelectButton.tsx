import FilterSelectButton from '@/components/Filter/FilterSelectButton';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';

const FilterMultiSelectButton = () => {
  const { onChange, onSearch } = useMultiSelectBaseContext();

  const handleClick = () => {
    onSearch({ value: null });
    onChange();
  };

  return <FilterSelectButton onClick={handleClick} />;
};

export default FilterMultiSelectButton;
