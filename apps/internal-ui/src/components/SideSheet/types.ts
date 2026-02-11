import { HTMLAttributes } from 'react';

import { OverlayProps } from '@/components/shared';

export interface SideSheetProps
  extends Pick<OverlayProps, 'isOpen'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  containerId?: string;
  isLoading?: boolean;
  title?: string;
  onClose: () => void;
}

export interface ResponsibleSideSheetProps extends SideSheetProps {}

export interface SideSheetFullScreenDialogProps
  extends Omit<ResponsibleSideSheetProps, 'containerId' | 'title'>,
    Required<Pick<ResponsibleSideSheetProps, 'title'>> {}
