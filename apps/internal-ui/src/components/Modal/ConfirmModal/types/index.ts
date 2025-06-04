import { IconProps } from '@/components/Icon';
import { ModalPrimitiveProps } from '@/components/Modal/shared';
import { ColorVariants } from '@/variants';

export interface ConfirmModalProps extends ModalPrimitiveProps {
  useIcon?: boolean;
  iconOptions?: {
    color?: ColorVariants;
    backgroundColor?: ColorVariants;
    iconKey?: IconProps['iconKey'];
  };
}
