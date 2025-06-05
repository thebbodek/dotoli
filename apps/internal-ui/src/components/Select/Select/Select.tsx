import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import SelectItem from '@/components/Select/Select/SelectItem';
import { SelectProps } from '@/components/Select/Select/types';
import { SelectBase } from '@/components/Select/shared';

const Select = ({
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
}: PropsWithChildren<SelectProps>) => {
  const showPlaceholder = !value;

  return (
    <SelectBase
      className={className}
      label={<SelectBase.Label badge={badge}>{label}</SelectBase.Label>}
      popoverOption={popoverOption}
      trigger={
        <SelectBase.Trigger>
          <button
            type='button'
            className={clsx(
              'text-body-16-r truncate text-black',
              (showPlaceholder || disabled) && 'text-gray-04',
            )}
            disabled={disabled}
          >
            {value || placeholder}
          </button>
        </SelectBase.Trigger>
      }
      disabled={disabled}
      feedback={feedback}
      required={required}
      isError={isError}
    >
      <SelectBase.PopoverWrapper className='h-[14.875rem] p-1'>
        <SelectBase.List>{children}</SelectBase.List>
      </SelectBase.PopoverWrapper>
    </SelectBase>
  );
};

export default Select;

Select.displayName = 'Select';
Select.Item = SelectItem;
