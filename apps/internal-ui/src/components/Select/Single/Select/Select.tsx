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
  onSelect,
  displayValue,
}: PropsWithChildren<SelectProps<T>>) => {
  return (
    <SingleSelectBase
      type={SELECT_TYPE.SELECT}
      className={className}
      label={label}
      popoverOption={popoverOption}
      disabled={disabled}
      feedback={feedback}
      required={required}
      isError={isError}
      value={value}
      badge={badge}
      onSelect={onSelect}
      displayValue={displayValue}
      placeholder={placeholder}
      popoverWrapperClassName={'h-[14.875rem] p-1'}
    >
      <SingleSelectBaseList>{children}</SingleSelectBaseList>
    </SingleSelectBase>
  );
};

export default Select;

Select.displayName = 'Select';
Select.Item = SelectItem;
