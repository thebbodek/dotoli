import { OverlayFooterProps } from '@/components/shared';

export interface ModalFooterProps
  extends Omit<OverlayFooterProps, 'isFull' | 'className'> {}
