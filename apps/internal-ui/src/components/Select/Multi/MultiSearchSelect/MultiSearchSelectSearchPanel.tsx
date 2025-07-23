import MultiSearchSelectListHeader from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectListHeader';
import MultiSearchSelectListItem from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectListItem';
import MultiSelectBaseList from '@/components/Select/Multi/shared/MultiSelectBaseList';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import { SelectBaseListEmpty } from '@/components/Select/shared';

const MultiSearchSelectSearchPanel = () => {
  const { internalOptions, currentSearchValue } = useMultiSelectBaseContext();
  const _internalOptions = !currentSearchValue
    ? internalOptions
    : internalOptions.filter(({ label }) => label.includes(currentSearchValue));
  const isEmpty = !!currentSearchValue && _internalOptions.length === 0;

  const renderer = () => {
    if (isEmpty) {
      return <SelectBaseListEmpty />;
    }

    return _internalOptions.map(({ label, isSelected, key }) => (
      <MultiSearchSelectListItem
        key={key}
        optionKey={key}
        label={label}
        isSelected={isSelected}
      />
    ));
  };

  return (
    <>
      <MultiSearchSelectListHeader count={_internalOptions.length} />
      <MultiSelectBaseList>{renderer()}</MultiSelectBaseList>
    </>
  );
};

export default MultiSearchSelectSearchPanel;
