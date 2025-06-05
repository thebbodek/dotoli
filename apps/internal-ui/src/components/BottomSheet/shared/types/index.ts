import { OverlayProps } from '@/components/shared';
import { HTMLAttributes } from 'react';

export interface BottomSheetProps
  extends Pick<OverlayProps, 'isOpen' | 'ref' | 'className'> {}

export interface BottomSheetContentContainerProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}
