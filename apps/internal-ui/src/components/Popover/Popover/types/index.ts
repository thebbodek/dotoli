import { Dispatch, HTMLAttributes, ReactElement, SetStateAction } from 'react';

import { ComponentPropsRef } from '@/components/shared';

export type PopoverFunctionChildren = ({
  close,
}: PopoverChildrenProps) => ReactElement<
  HTMLAttributes<HTMLElement> & ComponentPropsRef<HTMLElement>
>;

export interface PopoverChildrenProps {
  close: () => void;
}

export interface UseScrollLockOutSideEffectProps
  extends Required<ComponentPropsRef<HTMLElement>>,
    Pick<UsePopoverReturn, 'isOpen'> {}

export interface UsePopoverFocusEffectProps
  extends Pick<UsePopoverReturn, 'isOpen'> {
  popoverRef: Required<ComponentPropsRef<HTMLElement>>['ref'];
}

export interface GetPopoverPositionProps {
  root: HTMLElement;
  trigger: HTMLElement;
  popover: HTMLElement;
  applyMaxWidth?: boolean;
  offset?: number;
}

export interface PopoverRefProps {
  popoverRef: Required<ComponentPropsRef<HTMLElement>>['ref'];
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
    Pick<UsePopoverReturn, 'isOpen'> {
  setStyle: Dispatch<SetStateAction<PopoverStyle>>;
}

export interface UsePopoverPositionProps
  extends Omit<UsePopoverPositionEffectProps, 'setStyle'> {}

export interface TriggerPropsParams
  extends Pick<PopoverRefProps, 'triggerRef'> {}

export interface ChildPropsParams extends Pick<PopoverRefProps, 'popoverRef'> {
  popoverStyle: PopoverStyle;
}

export interface UsePopoverProps {
  trigger: ReactElement<
    HTMLAttributes<HTMLElement> & ComponentPropsRef<HTMLElement>
  >;
  children:
    | PopoverFunctionChildren
    | ReactElement<
        HTMLAttributes<HTMLElement> & ComponentPropsRef<HTMLElement>
      >;
  useHover?: boolean;
}

export interface UsePopoverReturn {
  isOpen: boolean;
  isValidElements: boolean;
  child: ReactElement<
    HTMLAttributes<HTMLElement> & ComponentPropsRef<HTMLElement>
  >;
  triggerProps: (
    params: TriggerPropsParams,
  ) => UsePopoverProps['trigger']['props'];
  childProps: (params: ChildPropsParams) => Omit<
    ReactElement<
      HTMLAttributes<HTMLElement> & ComponentPropsRef<HTMLElement>
    >['props'],
    'style'
  > & {
    style: PopoverStyle;
  };
  close: () => void;
}

export interface PopoverProps
  extends UsePopoverProps,
    Pick<GetPopoverPositionProps, 'applyMaxWidth' | 'offset'> {}
