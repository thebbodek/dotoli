import {
  OverlayBasePrimitiveProps,
  OverlayContentWrapperProps,
  OverlayFooterPrimitiveProps,
  OverlayFooterStateProps,
} from '@/components/shared';

export interface ModalProps extends OverlayBasePrimitiveProps {}

export interface ModalContentWrapperProps
  extends Omit<OverlayContentWrapperProps, 'className'> {}

export interface ModalFooterProps
  extends OverlayFooterPrimitiveProps,
    OverlayFooterStateProps {}
