import { UseFloatingOptions } from '@floating-ui/react';
import { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react';

export interface TooltipProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<UseFloatingOptions, 'placement'> {
  content: ReactNode;
  hidden?: boolean;
  rootClassName?: HTMLAttributes<HTMLDivElement>['className'];
}

export interface UseUpdateIsOpenEffectProps
  extends Required<Pick<TooltipProps, 'hidden'>> {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
