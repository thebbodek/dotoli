import { OverlayContentWrapperProps } from '@/components/shared';
import {
  OverlayBasePrimitiveProps,
  OverlayFooterPrimitiveProps,
  OverlayFooterStateProps,
} from '@/components/shared/components/Overlay/types';

export interface DialogProps extends OverlayBasePrimitiveProps {}

export interface DialogContentWrapperProps extends OverlayContentWrapperProps {}

export interface DialogFooterProps
  extends OverlayFooterPrimitiveProps,
    OverlayFooterStateProps {}
