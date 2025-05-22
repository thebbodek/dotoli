import { UseClickOutsideProps } from '@bbodek/hooks';
import { Dispatch, HTMLAttributes, ReactElement, SetStateAction } from 'react';

import { ComponentPropsRef } from '@/components/shared';

export interface UseScrollLockOutSideEffectProps
  extends Pick<PopoverProps, 'isOpen'> {
  ref: PopoverRefProps['popoverRef'];
}

export interface UsePopoverFocusEffectProps
  extends Pick<PopoverProps, 'isOpen' | 'useAutoFocus'>,
    Pick<PopoverRefProps, 'popoverRef'> {}

export interface GetPopoverPositionProps {
  root: HTMLElement;
  trigger: HTMLElement;
  popover: HTMLElement;
  applyMaxWidth?: boolean;
  offset?: number;
}

export interface PopoverRefProps {
  popoverRef: Required<ComponentPropsRef<HTMLDivElement>>['ref'];
  triggerRef: Required<ComponentPropsRef<HTMLElement>>['ref'];
}

export interface PopoverStyle {
  position?:
    | '-moz-initial'
    | '-webkit-sticky'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revert-layer'
    | 'unset'
    | 'inherit'
    | 'fixed'
    | 'absolute'
    | 'relative'
    | 'static'
    | 'sticky';
  opacity?:
    | number
    | '-moz-initial'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revert-layer'
    | 'unset'
    | string;
  left?: number | string;
  top?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  zIndex?:
    | number
    | '-moz-initial'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revert-layer'
    | 'unset'
    | string
    | 'auto';
}

export interface UsePopoverPositionEffectProps
  extends Pick<GetPopoverPositionProps, 'applyMaxWidth' | 'offset'>,
    PopoverRefProps,
    Pick<PopoverProps, 'isOpen'> {
  setStyle: Dispatch<SetStateAction<PopoverStyle>>;
}

export interface UsePopoverPositionProps
  extends Omit<UsePopoverPositionEffectProps, 'setStyle'> {}

export interface TriggerPropsParams
  extends Pick<PopoverRefProps, 'triggerRef'> {}

export interface PopoverPropsParams
  extends Pick<PopoverRefProps, 'popoverRef'> {
  popoverStyle: PopoverStyle;
}

export interface UsePopoverProps
  extends Pick<PopoverProps, 'isOpen' | 'trigger'> {}

export interface UsePopoverReturn {
  triggerProps: (
    params: TriggerPropsParams,
  ) => UsePopoverProps['trigger']['props'];
  popoverProps: (params: PopoverPropsParams) => Omit<
    ReactElement<
      HTMLAttributes<HTMLDivElement> & ComponentPropsRef<HTMLDivElement>
    >['props'],
    'style'
  > & {
    style: PopoverStyle;
  };
}

export interface PopoverProps
  extends UsePopoverProps,
    Pick<GetPopoverPositionProps, 'applyMaxWidth' | 'offset'>,
    Pick<UseClickOutsideProps, 'useClickOutsideEvent'> {
  trigger: ReactElement<
    HTMLAttributes<HTMLElement> & ComponentPropsRef<HTMLElement>
  >;
  children: ReactElement<
    HTMLAttributes<HTMLElement> & ComponentPropsRef<HTMLElement>
  >;
  isOpen: boolean;
  useAutoFocus?: boolean;
  onPopoverClose: () => void;
}
