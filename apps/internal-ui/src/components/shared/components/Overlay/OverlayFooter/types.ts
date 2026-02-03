import { HTMLAttributes } from 'react';

import { ButtonProps } from '@/components/Button';
import { OverlayContentWrapperProps } from '@/components/shared/components/Overlay/types';
import { TooltipProps } from '@/components/Tooltip';

export interface OverlayFooterWrapperProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {}

export interface OverlayFooterStateProps
  extends Pick<ButtonProps, 'isPending'>,
    Pick<OverlayContentWrapperProps, 'isLoading'> {
  possibleConfirm?: boolean;
}

export interface OverlayFooterStyleProps extends OverlayFooterWrapperProps {
  buttonSize?: ButtonProps['size'];
}

export interface OverlayFooterPrimitiveProps {
  confirmOption: {
    label: string;
    onConfirm: () => void;
    tooltipOption?: Partial<Pick<TooltipProps, 'content'>> & {
      useTooltip?: boolean;
    };
  };
  cancelOption?: {
    label?: string;
    onCancel?: () => void;
  };
}

export interface OverlayFooterProps
  extends OverlayFooterPrimitiveProps,
    OverlayFooterStateProps,
    OverlayFooterStyleProps {
  isFull?: boolean;
}
