import clsx from 'clsx';

import { useMultiSelectContext } from '@/components/Select/Multi/MultiSelect/context/MultiSelectContext';
import MultiSelectResultPanel from '@/components/Select/Multi/MultiSelect/MultiSelectResultPanel';

const MultiSelectSelectedHeader = () => {
  const { selectedListResultId, selectedValues } = useMultiSelectContext();

  return (
    <MultiSelectResultPanel
      id={selectedListResultId}
      className={clsx('text-body-12-m md:text-body-14-r md:py-2.5')}
      label='선택'
      count={selectedValues.length}
    />
  );
};

export default MultiSelectSelectedHeader;
