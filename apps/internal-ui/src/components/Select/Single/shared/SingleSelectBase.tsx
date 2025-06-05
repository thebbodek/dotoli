import { PropsWithChildren, useId } from 'react';

import { SelectBase } from '@/components/Select/shared';
import { SingleSelectListProvider } from '@/components/Select/Single/shared/context';
import SingleSelectTrigger from '@/components/Select/Single/shared/SingleSelectBaseTrigger';
import {
  SelectValue,
  SingleSelectBaseProps,
} from '@/components/Select/Single/shared/types';

const SingleSelectBase = <T extends SelectValue>({
  className,
  label,
  popoverOption,
  disabled,
  badge,
  feedback,
  required,
  isError,
  onSelect,
  value,
  displayValue,
  placeholder,
  type,
  children,
  popoverWrapperClassName,
}: PropsWithChildren<SingleSelectBaseProps<T>>) => {
  const selectListId = useId();
  const labelId = useId();

  return (
    <SelectBase
      type={type}
      className={className}
      label={<SelectBase.Label badge={badge}>{label}</SelectBase.Label>}
      popoverOption={popoverOption}
      trigger={<SingleSelectTrigger displayValue={displayValue} />}
      disabled={disabled}
      feedback={feedback}
      required={required}
      isError={isError}
      placeholder={placeholder}
      controls={selectListId}
      labelId={labelId}
    >
      {({ close }) => (
        <SingleSelectListProvider
          id={selectListId}
          labelId={labelId}
          value={value}
          onSelect={onSelect}
          close={close}
        >
          <SelectBase.PopoverWrapper className={popoverWrapperClassName}>
            {children}
          </SelectBase.PopoverWrapper>
        </SingleSelectListProvider>
      )}
    </SelectBase>
  );
};

export default SingleSelectBase;
