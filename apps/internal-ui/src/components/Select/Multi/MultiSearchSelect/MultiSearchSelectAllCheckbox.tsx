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
      className='group flex gap-x-1 hover:cursor-pointer'
      htmlFor={allCheckboxId}
    >
      <input
        aria-labelledby={allCheckboxLabelId}
        checked={isAllSelected}
        className='peer hidden'
        id={allCheckboxId}
        type='checkbox'
        onChange={onAllSelect}
      />
      <span
        className='peer-checked:text-in-primary-06 group-hover:text-in-primary-06'
        id={allCheckboxLabelId}
      >
        전체
      </span>
      <MultiSelectBaseCheckIcon isSelected={isAllSelected} />
    </label>
  );
};

export default MultiSearchSelectAllCheckbox;
