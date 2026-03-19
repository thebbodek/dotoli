import { useInputFieldBaseContext } from '@/components/Input/shared/context/InputFieldBaseProvider';
import { useInputToggleFieldContext } from '@/components/Input/shared/context/InputToggleFieldContext';
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
