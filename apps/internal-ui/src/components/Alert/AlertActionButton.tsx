import { useAlertContext } from '@/components/Alert/context';
import { AlertActionButtonProps } from '@/components/Alert/types';
import { ActionButton } from '@/components/shared/components/ActionButton';

const AlertActionButton = ({ className }: AlertActionButtonProps) => {
  const { theme, actionOption } = useAlertContext();

  if (!actionOption) return null;

  const { label, ...rest } = actionOption!;

  return (
    <ActionButton
      {...rest}
      className={className}
      iconOption={{ iconKey: 'caret-right' }}
      iconPosition='right'
      label={label ?? '확인하기'}
      size='sm'
      theme={theme}
      variant='text'
    />
  );
};

export default AlertActionButton;
