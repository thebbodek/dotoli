import { SelectBaseTriggerWrapper } from '@/components/Select/shared';
import SelectBaseDisplayValue from '@/components/Select/shared/SelectBaseDisplayValue';
import SelectBaseResetButton from '@/components/Select/shared/SelectBaseResetButton';
import {
  SelectValue,
  SingleSelectBaseTriggerProps,
} from '@/components/Select/Single/shared/types';

const SingleSelectBaseTrigger = <T extends SelectValue>({
  displayValue,
  disabled = false,
  onSelect,
  useReset = true,
}: SingleSelectBaseTriggerProps<T>) => {
  const hasValue = !!displayValue;
  const showResetButton = useReset && hasValue && !disabled;

  const onReset = () => {
    onSelect({ value: null as T });
  };

  return (
    <SelectBaseTriggerWrapper>
      <SelectBaseDisplayValue
        displayValue={displayValue}
        hasValue={!!displayValue}
      />
      {showResetButton && <SelectBaseResetButton onClick={onReset} />}
    </SelectBaseTriggerWrapper>
  );
};

export default SingleSelectBaseTrigger;
