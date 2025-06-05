import clsx from 'clsx';

import {
  SelectBaseTriggerWrapper,
  useSelectTriggerContext,
} from '@/components/Select/shared';
import { SingleSelectBaseTriggerProps } from '@/components/Select/Single/shared/types';

const SingleSelectBaseTrigger = ({
  displayValue,
}: SingleSelectBaseTriggerProps) => {
  const { disabled, placeholder } = useSelectTriggerContext();

  return (
    <SelectBaseTriggerWrapper>
      <button
        type='button'
        className={clsx(
          'text-body-16-r truncate text-black',
          (!displayValue || disabled) && 'text-gray-04',
        )}
        disabled={disabled}
      >
        {displayValue || placeholder}
      </button>
    </SelectBaseTriggerWrapper>
  );
};

export default SingleSelectBaseTrigger;
