import { IconButton, IconButtonProps } from '@/components/Button';
import { useFormRepeaterContext } from '@/components/FormRepeater/context/FormRepeaterContext';
import { useFormRepeaterListContext } from '@/components/FormRepeater/context/FormRepeaterListContext';
import { FormRepeaterListItemActionsContentProps } from '@/components/FormRepeater/types';

const FormRepeaterDeleteButton = ({
  isChanged,
  onClick,
}: Pick<FormRepeaterListItemActionsContentProps, 'isChanged'> &
  Pick<IconButtonProps, 'onClick'>) => {
  const { disabled: isAllDisabled } = useFormRepeaterContext();
  const { itemsCount } = useFormRepeaterListContext();
  const disabled = itemsCount === 1;
  const isDisabled = disabled || isAllDisabled;

  return (
    <IconButton
      aria-label='삭제'
      iconKey='trash'
      theme={isChanged && !isDisabled ? 'hover-white' : 'hover-gray'}
      onClick={onClick}
      disabled={isDisabled}
    />
  );
};

export default FormRepeaterDeleteButton;
