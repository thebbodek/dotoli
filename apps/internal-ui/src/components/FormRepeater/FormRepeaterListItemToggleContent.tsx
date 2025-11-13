import { useFormRepeaterContext } from '@/components/FormRepeater/context/FormRepeaterContext';
import FormRepeaterListItemContent from '@/components/FormRepeater/FormRepeaterListItemContent';
import { FormRepeaterListItemContentProps } from '@/components/FormRepeater/types';
import { Toggle, TOGGLE_SIZES, ToggleProps } from '@/components/Toggle';

const FormRepeaterListItemToggleContent = ({
  className,
  disabled,
  ...toggleProps
}: Omit<ToggleProps, 'size' | 'className'> &
  Pick<FormRepeaterListItemContentProps, 'className'>) => {
  const { disabled: isAllDisabled } = useFormRepeaterContext();

  return (
    <FormRepeaterListItemContent className={className}>
      <Toggle
        {...toggleProps}
        disabled={disabled || isAllDisabled}
        size={TOGGLE_SIZES.SM}
      />
    </FormRepeaterListItemContent>
  );
};

export default FormRepeaterListItemToggleContent;
