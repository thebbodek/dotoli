import { IconProps } from '@/components/Icon';
import { ModalPrimitiveProps } from '@/components/Modal/shared';
import { ColorVariants } from '@/variants';
import { HTMLAttributes } from 'react';

export interface ConfirmModalProps extends ModalPrimitiveProps {
  useIcon?: boolean;
  iconOptions?: {
    color?: ColorVariants;
    backgroundColor?: ColorVariants;
    iconKey?: IconProps['iconKey'];
  };
}

export interface ConfirmModalBodyProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}
