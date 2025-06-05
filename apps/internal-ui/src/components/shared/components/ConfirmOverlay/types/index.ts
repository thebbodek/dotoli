import { IconProps } from '@/components/Icon';
import {
  OverlayDescriptionProps,
  OverlayFooterProps,
  OverlayTitleProps,
} from '@/components/shared/components/Overlay';
import { ColorVariants } from '@/variants';
import { HTMLAttributes } from 'react';

export interface ConfirmOverlayProps
  extends Pick<
      OverlayFooterProps,
      'onConfirm' | 'onCancel' | 'confirmButtonLabel' | 'cancelButtonLabel'
    >,
    Pick<OverlayTitleProps, 'title'>,
    Pick<OverlayDescriptionProps, 'description'> {}

export interface ConfirmOverlayContentProps
  extends Pick<ConfirmOverlayProps, 'title' | 'description'> {
  useIcon?: boolean;
  iconOptions?: {
    color?: ColorVariants;
    backgroundColor?: ColorVariants;
    iconKey?: IconProps['iconKey'];
  };
}

export interface ConfirmOverlayContentContainerProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface ConfirmOverlayFooterProps
  extends Omit<OverlayFooterProps, 'isFull'> {}
