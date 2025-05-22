import { HTMLAttributes, ReactElement, RefObject } from 'react';

import { UseUpdatePopoverPositionProps } from '@/components/Popover/Popover/types/PopoverPosition';
import { ComponentPropsRef } from '@/components/shared';

export type PopoverFunctionChildren = ({
  close,
}: PopoverChildrenProps) => ReactElement<
  HTMLAttributes<HTMLElement> & ComponentPropsRef<HTMLElement>
>;

export interface PopoverChildrenProps {
  close: () => void;
}

export interface PopoverProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'onClick'>,
    Pick<UseUpdatePopoverPositionProps, 'applyMaxWidth'> {
  trigger: ReactElement<
    HTMLAttributes<HTMLElement> & ComponentPropsRef<HTMLElement>
  >;
  children:
    | PopoverFunctionChildren
    | ReactElement<
        HTMLAttributes<HTMLElement> & ComponentPropsRef<HTMLElement>
      >;
  useHover?: boolean;
  popoverOptions?: Pick<UseUpdatePopoverPositionProps, 'gap'>;
}

export interface UseScrollLockOutSideEffectProps {
  isOpen: boolean;
  ref: RefObject<Element | null>;
}
