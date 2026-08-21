import { HTMLAttributes } from 'react';

import { BottomActionBarProps } from '@/components/BottomActionBar';
import { HeaderBarProps } from '@/components/HeaderBar';
import { OverlayProps } from '@/components/shared/Overlay/types';

export interface BottomSheetProps
  extends Pick<OverlayProps, 'isOpen' | 'isDimmed' | 'target' | 'onClose'>,
    Pick<HeaderBarProps, 'title'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  actionOption?: BottomActionBarProps;
}
