import {
  OverlayBasePrimitiveProps,
  OverlayFooterPrimitiveProps,
  OverlayFooterStateProps,
} from '@/components/shared';

export interface ModalProps extends OverlayBasePrimitiveProps {}

export interface ModalFooterProps
  extends OverlayFooterPrimitiveProps,
    OverlayFooterStateProps {}
