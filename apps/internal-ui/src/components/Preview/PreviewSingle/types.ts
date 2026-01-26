import { PreviewProps } from '@/components/Preview/shared';
import { OverlayPrimitiveProps } from '@/components/shared';

export interface PreviewSingleProps
  extends Pick<OverlayPrimitiveProps, 'isOpen'>,
    Omit<PreviewProps, 'closeOption' | 'id'>,
    Pick<PreviewProps['closeOption'], 'onClose'> {}
