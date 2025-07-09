import {
  ButtonPrimitiveProps,
  GetResponsiveStylesProps,
} from '@/components/Button/shared/types';
import { ContainerVariant } from '@/variants/container/types';

export const getResponsiveStyles = <T>({
  styles,
  responsive = {} as NonNullable<ButtonPrimitiveProps['responsive']>,
}: GetResponsiveStylesProps<T>) => {
  const containers = Object.entries(responsive);

  return containers.map(
    ([container, size]) => styles[container as ContainerVariant][size],
  );
};
