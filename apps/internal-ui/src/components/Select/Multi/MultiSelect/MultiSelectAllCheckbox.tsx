import { useId } from 'react';

import MultiSelectCheckIcon from '@/components/Select/Multi/MultiSelect/MultiSelectCheckIcon';
import { useMultiSelectContext } from '@/components/Select/Multi/MultiSelect/context/MultiSelectContext';

const MultiSelectAllCheckbox = () => {
  const allCheckboxId = useId();
  const allCheckboxLabelId = `${allCheckboxId}-label`;
  const { onAllSelect } = useMultiSelectContext();

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
      />
      <span
        id={allCheckboxLabelId}
        className='peer-checked:text-primary-06 group-hover:text-primary-06'
      >
        전체
      </span>
      <MultiSelectCheckIcon activeClassName='peer-checked:text-primary-06 group-hover:text-primary-06' />
    </label>
  );
};

export default MultiSelectAllCheckbox;
