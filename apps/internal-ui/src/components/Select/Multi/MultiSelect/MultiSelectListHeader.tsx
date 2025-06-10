import { useMultiSelectContext } from '@/components/Select/Multi/MultiSelect/context/MultiSelectContext';
import MultiSelectAllCheckbox from '@/components/Select/Multi/MultiSelect/MultiSelectAllCheckbox';
import MultiSelectResultPanel from '@/components/Select/Multi/MultiSelect/MultiSelectResultPanel';
import { MultiSelectListHeaderProps } from '@/components/Select/Multi/MultiSelect/types';

const MultiSelectListHeader = ({ count }: MultiSelectListHeaderProps) => {
  const { selectListResultId } = useMultiSelectContext();

  return (
    <div className='text-body-14-r text-gray-05 mb-2 flex items-center justify-between px-3'>
      <MultiSelectResultPanel
        id={selectListResultId}
        label='검색결과'
        count={count}
      />
      <MultiSelectAllCheckbox />
    </div>
  );
};

export default MultiSelectListHeader;
