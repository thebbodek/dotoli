import MultiSearchSelectListHeader from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectListHeader';
import MultiSearchSelectListItem from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectListItem';
import MultiSelectBaseList from '@/components/Select/Multi/shared/MultiSelectBaseList';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';

const MultiSearchSelectSearchPanel = () => {
  const { internalOptions, currentSearchValue } = useMultiSelectBaseContext();
  const _internalOptions = !currentSearchValue
    ? internalOptions
    : internalOptions.filter(({ label }) => label.includes(currentSearchValue));

  return (
    <>
      <MultiSearchSelectListHeader count={_internalOptions.length} />
      <MultiSelectBaseList>
        {_internalOptions.map(({ label, isSelected, key }) => (
          <MultiSearchSelectListItem
            key={key}
            optionKey={key}
            label={label}
            isSelected={isSelected}
          />
        ))}
      </MultiSelectBaseList>
    </>
  );
};

export default MultiSearchSelectSearchPanel;
