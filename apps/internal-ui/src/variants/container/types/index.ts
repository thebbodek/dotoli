import { CONTAINER_VARIANTS } from '@/variants/container';

export type ContainerVariant =
  (typeof CONTAINER_VARIANTS)[keyof typeof CONTAINER_VARIANTS];
