import { useFilterContext } from '@/components/Filter/context';
import FilterSelectOptionCategory from '@/components/Filter/FilterSelectOptionCategory';

const FilterSelectOptionCategories = () => {
  const { selectOptions } = useFilterContext();

  return (
    <ul className='in-flex-v-stack in-tablet:gap-y-1 in-tablet:px-5 gap-y-2 overflow-y-auto p-4'>
      {selectOptions.map((option) => (
        <FilterSelectOptionCategory
          {...option}
          key={option.key}
          optionKey={option.key}
        />
      ))}
    </ul>
  );
};

export default FilterSelectOptionCategories;
