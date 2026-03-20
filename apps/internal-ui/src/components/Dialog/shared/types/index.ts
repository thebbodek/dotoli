import { ReactNode } from 'react';

import { OverlayContentWrapperProps } from '@/components/shared';
import {
  OverlayFooterPrimitiveProps,
  OverlayFooterStateProps,
} from '@/components/shared/components/Overlay/OverlayFooter/types';
import {
  OverlayBasePrimitiveProps,
  OverlayProps,
} from '@/components/shared/components/Overlay/types';

export interface DialogProps
  extends OverlayBasePrimitiveProps,
    Pick<OverlayProps, 'wrapperClassName'> {
  slot?: ReactNode;
}

export interface DialogContentWrapperProps extends OverlayContentWrapperProps {}

export interface DialogFooterProps
  extends OverlayFooterPrimitiveProps,
    OverlayFooterStateProps {}
