import { HTMLAttributes } from 'react';

import {
  OverlayBasePrimitiveProps,
  OverlayFooterPrimitiveProps,
  OverlayFooterStateProps,
} from '@/components/shared';

export interface BottomSheetProps extends OverlayBasePrimitiveProps {}

export interface BottomSheetContentWrapperProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface BottomSheetFooterProps
  extends OverlayFooterPrimitiveProps,
    OverlayFooterStateProps {}
