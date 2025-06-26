import {
  OverlayBasePrimitiveProps,
  OverlayContentWrapperProps,
  OverlayFooterPrimitiveProps,
  OverlayFooterStateProps,
} from '@/components/shared';

export interface BottomSheetProps extends OverlayBasePrimitiveProps {}

export interface BottomSheetContentWrapperProps
  extends Pick<OverlayContentWrapperProps, 'isLoading' | 'className'> {}

export interface BottomSheetFooterProps
  extends OverlayFooterPrimitiveProps,
    OverlayFooterStateProps {}
