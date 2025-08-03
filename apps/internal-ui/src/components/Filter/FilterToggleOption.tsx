import { useFilterContext } from '@/components/Filter/context';
import FilterToggleOptionItem from '@/components/Filter/FilterToggleOptionItem';
import { FilterToggleOptionItemProps } from '@/components/Filter/types';

const FilterToggleOption = () => {
  const {
    toggleOptions,
    onChange,
    toggleValues = [],
    selectValues = {},
  } = useFilterContext();

  const handleChange = ({
    optionKey,
  }: Parameters<FilterToggleOptionItemProps['handleChange']>[0]) => {
    const currentValues = toggleValues ?? [];
    const isChecked = currentValues.includes(optionKey);

    const newToggleValues = isChecked
      ? currentValues.filter((value) => value !== optionKey)
      : [...currentValues, optionKey];

    onChange({
      toggleValues: newToggleValues,
      selectValues,
    });
  };

  return (
    <ul className='in-flex-v-stack bg-in-gray-01 border-b-in-gray-02 in-tablet:gap-y-3 in-tablet:py-4 in-tablet:px-6 gap-y-[1.125rem] border-b px-5 py-[1.625rem]'>
      {toggleOptions.map(({ label, key }) => (
        <FilterToggleOptionItem
          key={key}
          optionKey={key}
          label={label}
          checked={toggleValues?.includes(key) ?? false}
          handleChange={handleChange}
        />
      ))}
    </ul>
  );
};

export default FilterToggleOption;
