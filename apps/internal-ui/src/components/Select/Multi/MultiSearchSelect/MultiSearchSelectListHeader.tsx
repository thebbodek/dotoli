import MultiSearchSelectAllCheckbox from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectAllCheckbox';
import { MultiSearchSelectListHeaderProps } from '@/components/Select/Multi/MultiSearchSelect/types';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import MultiSelectBaseResultPanel from '@/components/Select/Multi/shared/MultiSelectBaseResultPanel';

const MultiSearchSelectListHeader = ({
  count,
}: MultiSearchSelectListHeaderProps) => {
  const { selectListResultId } = useMultiSelectBaseContext();
  const ariaLabel = `${count}개 항목 검색됨`;

  return (
    <div className='text-in-body-14-r text-in-gray-05 mb-2 flex items-center justify-between px-3'>
      <strong id={selectListResultId} className='sr-only'>
        {ariaLabel}
      </strong>
      <MultiSelectBaseResultPanel label='검색결과' count={count} />
      <MultiSearchSelectAllCheckbox />
    </div>
  );
};

export default MultiSearchSelectListHeader;
