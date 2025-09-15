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
      arialLabel='초기화'
      iconKey='arrow-bend-up-left'
      theme={disabled ? 'hover-gray' : 'hover-white'}
      className={clsx(isChanged && !isAdded ? 'visible' : 'invisible')}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default FormRepeaterResetButton;
