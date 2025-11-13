import { UseFloatingOptions } from '@floating-ui/react';
import { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react';

import { ColorVariants } from '@/variants';

export interface TooltipProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'id' | 'role'>,
    Pick<UseFloatingOptions, 'placement'> {
  content: ReactNode;
  hidden?: boolean;
  rootClassName?: HTMLAttributes<HTMLDivElement>['className'];
  color?: ColorVariants;
  isKeepFloating?: boolean;
  ariaLive?: HTMLAttributes<HTMLDivElement>['aria-live'];
  gap?: number;
}

export interface UseTooltipOpenEffectProps
  extends Required<Pick<TooltipProps, 'hidden' | 'isKeepFloating'>> {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
