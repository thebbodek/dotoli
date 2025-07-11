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
      variant='text'
      size='sm'
      theme={theme}
      label={label ?? '확인하기'}
      iconOption={{ iconKey: 'caret-right' }}
      iconPosition='right'
      className={className}
    />
  );
};

export default AlertActionButton;
