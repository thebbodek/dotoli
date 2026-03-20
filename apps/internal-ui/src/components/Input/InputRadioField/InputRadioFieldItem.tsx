import { useInputRadioFieldContext } from '@/components/Input/InputRadioField/context';
import { InputRadioFieldItemProps } from '@/components/Input/InputRadioField/types';
import { useInputFieldBaseContext } from '@/components/Input/shared/context/InputFieldBaseContext';
import { Radio } from '@/components/Radio';

const InputRadioFieldItem = <T extends string>({
  value,
  label,
}: InputRadioFieldItemProps<T>) => {
  const { value: selectedValue, name, size } = useInputRadioFieldContext<T>();
  const { disabled, onChange } = useInputFieldBaseContext();

  return (
    <Radio
      checked={Object.is(value, selectedValue)}
      disabled={disabled}
      label={label}
      name={name}
      size={size}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputRadioFieldItem;
