import { useFormRepeaterContext } from '@/components/FormRepeater/context/FormRepeaterContext';
import { useFormRepeaterListItemContentContext } from '@/components/FormRepeater/context/FormRepeaterListItemContentContext';
import FormRepeaterListItemContentBase from '@/components/FormRepeater/FormRepeaterListItemContentBase';
import { FormRepeaterListItemContentProps } from '@/components/FormRepeater/types';
import { InputField, InputFieldProps } from '@/components/Input';

const FormRepeaterListItemInputContent = ({
  className,
  disabled,
  ...inputProps
}: Pick<FormRepeaterListItemContentProps, 'className'> &
  Omit<
    InputFieldProps,
    'label' | 'required' | 'hiddenLabel' | 'className'
  >) => {
  const { disabled: isAllDisabled } = useFormRepeaterContext();
  const { column } = useFormRepeaterListItemContentContext();
  const { label, required } = column.props;

  return (
    <FormRepeaterListItemContentBase className={className}>
      <InputField
        {...inputProps}
        disabled={disabled || isAllDisabled}
        label={label}
        required={required}
        hiddenLabel
      />
    </FormRepeaterListItemContentBase>
  );
};

export default FormRepeaterListItemInputContent;
