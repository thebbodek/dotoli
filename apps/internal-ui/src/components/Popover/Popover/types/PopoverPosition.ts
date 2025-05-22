import { PopoverChildrenProps } from '@/components/Popover/Popover/types';
import { CSSProperties, Dispatch, RefObject, SetStateAction } from 'react';

export interface GetPopoverPositionProps {
  root: Element;
  trigger: Element;
  popover: Element;
  applyMaxWidth?: boolean;
  gap?: number;
}

export interface UseUpdatePopoverPositionProps
  extends Pick<GetPopoverPositionProps, 'applyMaxWidth' | 'gap'>,
    PopoverChildrenProps {
  isOpen: boolean;
}

export interface UseUpdatePopoverPositionEffectProps
  extends Omit<UseUpdatePopoverPositionProps, 'close'> {
  popoverRef: RefObject<Element | null>;
  triggerRef: RefObject<Element | null>;
  setStyle: Dispatch<SetStateAction<CSSProperties>>;
}
