import { useAlertContext } from '@/components/Alert/context';
import { AlertButtonProps } from '@/components/Alert/types';
import { Button, ButtonProps, LinkButton } from '@/components/Button';

const AlertButton = ({ className }: AlertButtonProps) => {
  const { theme, buttonOption } = useAlertContext();

  if (!buttonOption) return null;

  const { label, href, onClick } = buttonOption;
  const commonProps: Pick<
    ButtonProps,
    | 'variant'
    | 'size'
    | 'theme'
    | 'label'
    | 'className'
    | 'iconOption'
    | 'iconPosition'
  > = {
    variant: 'text',
    size: 'sm',
    theme,
    label: label ?? '확인하기',
    iconOption: { iconKey: 'caret-right' },
    iconPosition: 'right',
    className,
  };

  if (href) {
    return <LinkButton {...commonProps} href={href} />;
  }

  return <Button {...commonProps} onClick={onClick} />;
};

export default AlertButton;
