import Checkbox from '@/components/Checkbox/Checkbox';
import { useInputCheckboxFieldContext } from '@/components/Input/InputCheckboxField/context';
import { InputCheckboxFieldItemProps } from '@/components/Input/InputCheckboxField/types';
import { useInputFieldBaseContext } from '@/components/Input/shared/context/InputFieldBaseContext';

const InputCheckboxFieldItem = <T extends string>({
  label,
  value,
}: InputCheckboxFieldItemProps<T>) => {
  const { values, name, size } = useInputCheckboxFieldContext<T>();
  const { disabled, onChange } = useInputFieldBaseContext();

  return (
    <Checkbox
      checked={values.includes(value)}
      disabled={disabled}
      label={label}
      name={name}
      size={size}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputCheckboxFieldItem;
