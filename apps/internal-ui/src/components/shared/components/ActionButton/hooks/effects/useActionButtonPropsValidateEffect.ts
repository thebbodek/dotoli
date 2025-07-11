import { useEffect } from 'react';

import { ACTION_BUTTON_ELEMENTS } from '@/components/shared/components/ActionButton/constants';
import { UseActionButtonPropsValidationEffect } from '@/components/shared/components/ActionButton/types';

const useActionButtonPropsValidationEffect = ({
  as,
  buttonOption,
  linkOption,
}: UseActionButtonPropsValidationEffect) => {
  useEffect(() => {
    if (as === ACTION_BUTTON_ELEMENTS.LINK && !linkOption) {
      throw new Error('linkOption is required when as prop is set to "link"');
    }

    if (as === ACTION_BUTTON_ELEMENTS.LINK && !!buttonOption) {
      throw new Error(
        'buttonOption cannot be used when as prop is set to "link"',
      );
    }

    if (as === ACTION_BUTTON_ELEMENTS.BUTTON && !!linkOption) {
      throw new Error(
        'linkOption cannot be used when as prop is set to "button"',
      );
    }
  }, [as, linkOption, buttonOption]);
};

export default useActionButtonPropsValidationEffect;
