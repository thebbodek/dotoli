import { PreviewMultiPrimitiveProps } from '@/components/Preview/shared/types';

export interface PreviewInlineProps
  extends Omit<PreviewMultiPrimitiveProps, 'closeOption'>,
    Pick<PreviewMultiPrimitiveProps['closeOption'], 'onClose'> {
  isExpanded: boolean;
  onExpand: () => void;
}
