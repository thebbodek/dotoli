import { PreviewMultiPrimitiveProps } from '@/components/Preview/shared/types';
import { OverlayPrimitiveProps } from '@/components/shared';

export interface PreviewMultiProps
  extends Pick<OverlayPrimitiveProps, 'isOpen'>,
    Omit<PreviewMultiPrimitiveProps, 'closeOption'>,
    Pick<PreviewMultiPrimitiveProps['closeOption'], 'onClose'> {}
