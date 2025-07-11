import { Button, LinkButton } from '@/components/Button';
import { ACTION_BUTTON_ELEMENTS } from '@/components/shared/components/ActionButton/constants';
import useActionButtonPropsValidationEffect from '@/components/shared/components/ActionButton/hooks/effects/useActionButtonPropsValidateEffect';
import { ActionButtonProps } from '@/components/shared/components/ActionButton/types';

const ActionButton = ({
  as = ACTION_BUTTON_ELEMENTS.LINK,
  buttonOption,
  linkOption,
  ...props
}: ActionButtonProps) => {
  useActionButtonPropsValidationEffect({ as, linkOption, buttonOption });

  if (as === ACTION_BUTTON_ELEMENTS.BUTTON && buttonOption) {
    return <Button {...props} {...buttonOption} />;
  }

  if (as === ACTION_BUTTON_ELEMENTS.LINK && linkOption) {
    return <LinkButton {...props} {...linkOption} />;
  }
};

export default ActionButton;
