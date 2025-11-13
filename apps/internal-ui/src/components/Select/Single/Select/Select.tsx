import { PropsWithChildren } from 'react';

import { SELECT_TYPE } from '@/components/Select/shared';
import SelectItem from '@/components/Select/Single/Select/SelectItem';
import { SelectProps } from '@/components/Select/Single/Select/types';
import {
  SingleSelectBase,
  SingleSelectBaseList,
} from '@/components/Select/Single/shared';
import { SelectValue } from '@/components/Select/Single/shared/types';

const Select = <T extends SelectValue>({
  label,
  value,
  badge,
  children,
  feedback,
  className,
  placeholder,
  isError = false,
  disabled = false,
  required = false,
  popoverOption,
  hiddenLabel,
  useReset,
  onSelect,
  displayValue,
}: PropsWithChildren<SelectProps<T>>) => {
  return (
    <SingleSelectBase
      badge={badge}
      className={className}
      disabled={disabled}
      displayValue={displayValue}
      feedback={feedback}
      hiddenLabel={hiddenLabel}
      isError={isError}
      label={label}
      placeholder={placeholder}
      popoverOption={popoverOption}
      popoverWrapperClassName='max-h-[14.875rem] p-1'
      required={required}
      type={SELECT_TYPE.SELECT}
      useReset={useReset}
      value={value}
      onSelect={onSelect}
    >
      <SingleSelectBaseList>{children}</SingleSelectBaseList>
    </SingleSelectBase>
  );
};

export default Select;

Select.displayName = 'Select';
Select.Item = SelectItem;
