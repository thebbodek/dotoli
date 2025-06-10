import { IconProps } from '@/components/Icon';
import {
  OverlayDescriptionProps,
  OverlayFooterStateProps,
  OverlayPrimitiveProps,
} from '@/components/shared/components/Overlay';
import { ColorVariants } from '@/variants';

export interface ConfirmOverlayProps
  extends OverlayPrimitiveProps,
    OverlayFooterStateProps {
  useIcon?: boolean;
  iconOptions?: {
    color?: ColorVariants;
    backgroundColor?: ColorVariants;
    iconKey?: IconProps['iconKey'];
  };
}

export interface ConfirmOverlayContentProps
  extends Pick<ConfirmOverlayProps, 'title' | 'useIcon' | 'iconOptions'> {}

export interface ConfirmOverlayDescriptionProps
  extends Pick<OverlayDescriptionProps, 'description'> {}
