import clsx from 'clsx';

import MultiSelectResultPanel from '@/components/Select/Multi/shared/MultiSelectBaseResultPanel';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';

const MultiSelectBaseSelectedHeader = () => {
  const { selectedListResultId, internalOptions } = useMultiSelectBaseContext();
  const count = internalOptions.filter(({ isSelected }) => isSelected).length;
  const values = internalOptions.map((v) => v.value).join(', ');
  const ariaLabel = `${count}개 항목 선택됨: ${values}`;

  return (
    <>
      <strong id={selectedListResultId} className='sr-only'>
        {ariaLabel}
      </strong>
      <MultiSelectResultPanel
        className={clsx(
          'text-in-body-12-m in-tablet:text-in-body-14-r in-tablet:py-2.5',
        )}
        label='선택'
        count={count}
      />
    </>
  );
};

export default MultiSelectBaseSelectedHeader;
