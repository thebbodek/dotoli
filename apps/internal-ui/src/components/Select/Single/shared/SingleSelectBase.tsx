import clsx from 'clsx';
import { PropsWithChildren, useId } from 'react';

import { SelectBase } from '@/components/Select/shared';
import { SingleSelectListProvider } from '@/components/Select/Single/shared/context';
import SingleSelectBaseTrigger from '@/components/Select/Single/shared/SingleSelectBaseTrigger';
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
  hiddenLabel,
  useReset,
}: PropsWithChildren<SingleSelectBaseProps<T>>) => {
  const selectListId = useId();
  const labelId = useId();

  return (
    <SelectBase
      label={
        <SelectBase.Label badge={badge} hidden={hiddenLabel} label={label} />
      }
      trigger={
        <SingleSelectBaseTrigger
          disabled={disabled}
          displayValue={displayValue}
          useReset={useReset}
          onSelect={onSelect}
        />
      }
      className={className}
      controls={selectListId}
      disabled={disabled}
      feedback={feedback}
      isError={isError}
      labelId={labelId}
      placeholder={placeholder}
      popoverOption={popoverOption}
      required={required}
      type={type}
    >
      {({ close }) => (
        <SingleSelectListProvider
          close={close}
          id={selectListId}
          labelId={labelId}
          value={value}
          onSelect={onSelect}
        >
          <SelectBase.PopoverWrapper
            className={clsx('in-flex-v-stack', popoverWrapperClassName)}
          >
            {children}
          </SelectBase.PopoverWrapper>
        </SingleSelectListProvider>
      )}
    </SelectBase>
  );
};

export default SingleSelectBase;
