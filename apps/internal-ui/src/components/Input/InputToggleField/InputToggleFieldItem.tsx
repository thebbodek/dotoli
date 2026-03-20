import { useInputToggleFieldContext } from '@/components/Input/InputToggleField/context';
import { useInputFieldBaseContext } from '@/components/Input/shared/context/InputFieldBaseContext';
import { Toggle, ToggleProps } from '@/components/Toggle';

const InputToggleFieldItem = ({ label }: Pick<ToggleProps, 'label'>) => {
  const { size, checked } = useInputToggleFieldContext();
  const { disabled, onChange } = useInputFieldBaseContext();

  return (
    <Toggle
      checked={checked}
      disabled={disabled}
      label={label}
      size={size}
      onChange={onChange}
    />
  );
};

export default InputToggleFieldItem;
