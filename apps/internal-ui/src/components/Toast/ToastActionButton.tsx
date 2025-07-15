import Link from 'next/link';

import { ACTION_BUTTON_ELEMENTS } from '@/components/shared';
import useActionButtonPropsValidationEffect from '@/components/shared/components/ActionButton/hooks/effects/useActionButtonPropsValidateEffect';
import { ToastProps } from '@/components/Toast/types';

const ToastActionButton = ({
  actionOption,
}: Required<Pick<ToastProps, 'actionOption'>>) => {
  const { as = 'link', label, linkOption, buttonOption } = actionOption;
  const className =
    'text-in-primary-04 in-button-sm in-flex-h-stack items-center';

  useActionButtonPropsValidationEffect({ as, linkOption, buttonOption });

  if (as === ACTION_BUTTON_ELEMENTS.BUTTON && buttonOption) {
    return (
      <button type='button' {...buttonOption} className={className}>
        {label}
      </button>
    );
  }

  if (as === ACTION_BUTTON_ELEMENTS.LINK && linkOption) {
    return (
      <Link {...linkOption} className={className}>
        {label}
      </Link>
    );
  }
};

export default ToastActionButton;
