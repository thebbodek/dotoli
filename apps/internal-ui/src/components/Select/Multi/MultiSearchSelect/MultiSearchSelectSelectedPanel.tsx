import MultiSearchSelectSelectedListItem from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectSelectedListItem';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import MultiSelectBaseSelectedList from '@/components/Select/Multi/shared/MultiSelectBaseSelectedList';

const MultiSearchSelectSelectedPanel = () => {
  const { internalOptions } = useMultiSelectBaseContext();
  const selectedOptions = internalOptions.filter(
    ({ isSelected }) => isSelected,
  );

  return (
    <MultiSelectBaseSelectedList className='in-tablet:h-auto h-[1.5rem]'>
      {selectedOptions.map(({ label, key }) => (
        <MultiSearchSelectSelectedListItem
          key={key}
          label={label}
          optionKey={key}
        />
      ))}
    </MultiSelectBaseSelectedList>
  );
};

export default MultiSearchSelectSelectedPanel;
