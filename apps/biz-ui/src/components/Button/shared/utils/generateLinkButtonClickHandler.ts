import { MouseEvent } from 'react';

import { GenerateLinkButtonClickHandlerProps } from '@/components/Button/shared/types';

export const generateLinkButtonClickHandler =
  ({ isDisabled, onClick }: GenerateLinkButtonClickHandlerProps) =>
  (e: MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();

      return;
    }

    onClick?.(e);
  };
