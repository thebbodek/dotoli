import MultiSearchSelectListHeader from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectListHeader';
import MultiSearchSelectListItem from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectListItem';
import { MultiSelectSearchPanelBase } from '@/components/Select/Multi/shared';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import MultiSelectBaseList from '@/components/Select/Multi/shared/MultiSelectBaseList';

const MultiSearchSelectSearchPanel = () => {
  const { filteredInternalOptions } = useMultiSelectBaseContext();

  return (
    <MultiSelectSearchPanelBase
      slot={
        <MultiSearchSelectListHeader count={filteredInternalOptions.length} />
      }
    >
      <MultiSelectBaseList className='h-full'>
        {filteredInternalOptions.map(({ label, isSelected, key }) => (
          <MultiSearchSelectListItem
            isSelected={isSelected}
            key={key}
            label={label}
            optionKey={key}
          />
        ))}
      </MultiSelectBaseList>
    </MultiSelectSearchPanelBase>
  );
};

export default MultiSearchSelectSearchPanel;
