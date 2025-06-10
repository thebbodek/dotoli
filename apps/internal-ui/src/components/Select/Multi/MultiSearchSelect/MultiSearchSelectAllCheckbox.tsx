import { useId } from 'react';

import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import MultiSelectBaseCheckIcon from '@/components/Select/Multi/shared/MultiSelectBaseCheckIcon';

const MultiSearchSelectAllCheckbox = () => {
  const allCheckboxId = useId();
  const allCheckboxLabelId = `${allCheckboxId}-label`;
  const { internalOptions, onAllSelect } = useMultiSelectBaseContext();
  const isAllSelected = internalOptions.every(({ isSelected }) => isSelected);

  return (
    <label
      htmlFor={allCheckboxId}
      className='group flex gap-x-1 hover:cursor-pointer'
    >
      <input
        id={allCheckboxId}
        className='peer hidden'
        aria-labelledby={allCheckboxLabelId}
        type='checkbox'
        onChange={onAllSelect}
        checked={isAllSelected}
      />
      <span
        id={allCheckboxLabelId}
        className='peer-checked:text-in-primary-06 group-hover:text-in-primary-06'
      >
        전체
      </span>
      <MultiSelectBaseCheckIcon isSelected={isAllSelected} />
    </label>
  );
};

export default MultiSearchSelectAllCheckbox;
