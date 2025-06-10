import { IconProps } from '@/components/Icon';
import {
  OverlayPrimitiveProps,
  OverlayDescriptionProps,
} from '@/components/shared/components/Overlay';
import { ColorVariants } from '@/variants';

export interface ConfirmOverlayProps extends OverlayPrimitiveProps {
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
