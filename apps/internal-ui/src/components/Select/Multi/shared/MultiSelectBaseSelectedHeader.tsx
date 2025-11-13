import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import MultiSelectResultPanel from '@/components/Select/Multi/shared/MultiSelectBaseResultPanel';

const MultiSelectBaseSelectedHeader = () => {
  const { selectedListResultId, internalOptions } = useMultiSelectBaseContext();
  const count = internalOptions.filter(({ isSelected }) => isSelected).length;
  const values = internalOptions.map((v) => v.value).join(', ');
  const ariaLabel = `${count}개 항목 선택됨: ${values}`;

  return (
    <>
      <strong className='sr-only' id={selectedListResultId}>
        {ariaLabel}
      </strong>
      <MultiSelectResultPanel
        className='text-in-body-12-m in-tablet:text-in-body-14-r in-tablet:py-2.5'
        count={count}
        label='선택'
      />
    </>
  );
};

export default MultiSelectBaseSelectedHeader;
