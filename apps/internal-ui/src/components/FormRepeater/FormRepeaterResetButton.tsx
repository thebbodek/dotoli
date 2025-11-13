import clsx from 'clsx';

import { IconButton, IconButtonProps } from '@/components/Button';
import { useFormRepeaterContext } from '@/components/FormRepeater/context/FormRepeaterContext';
import { FormRepeaterListItemActionsContentProps } from '@/components/FormRepeater/types';

const FormRepeaterResetButton = ({
  isChanged,
  isAdded,
  onClick,
}: Pick<FormRepeaterListItemActionsContentProps, 'isChanged' | 'isAdded'> &
  Pick<IconButtonProps, 'onClick'>) => {
  const { disabled } = useFormRepeaterContext();

  return (
    <IconButton
      aria-label='초기화'
      className={clsx(isChanged && !isAdded ? 'visible' : 'invisible')}
      disabled={disabled}
      iconKey='arrow-bend-up-left'
      theme={disabled ? 'hover-gray' : 'hover-white'}
      onClick={onClick}
    />
  );
};

export default FormRepeaterResetButton;
