import { PropsWithChildren } from 'react';

import { useFormRepeaterContext } from '@/components/FormRepeater/context/FormRepeaterContext';
import { useFormRepeaterListItemContentContext } from '@/components/FormRepeater/context/FormRepeaterListItemContentContext';
import FormRepeaterListItemContentBase from '@/components/FormRepeater/FormRepeaterListItemContentBase';
import { FormRepeaterListItemContentProps } from '@/components/FormRepeater/types';
import { Select, SelectProps, SelectValue } from '@/components/Select';

const FormRepeaterListItemSelectContent = <T extends SelectValue>({
  className,
  disabled,
  ...selectProps
}: Pick<FormRepeaterListItemContentProps, 'className'> &
  PropsWithChildren<
    Omit<SelectProps<T>, 'label' | 'required' | 'hiddenLabel' | 'className'>
  >) => {
  const { column } = useFormRepeaterListItemContentContext();
  const { disabled: isAllDisabled } = useFormRepeaterContext();
  const { label, required } = column.props;

  return (
    <FormRepeaterListItemContentBase className={className}>
      <Select
        {...selectProps}
        className='w-full'
        label={label}
        required={required}
        disabled={disabled || isAllDisabled}
        hiddenLabel
      />
    </FormRepeaterListItemContentBase>
  );
};

export default FormRepeaterListItemSelectContent;
