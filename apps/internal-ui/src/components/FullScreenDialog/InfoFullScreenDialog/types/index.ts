import { InfoDialogOverlayPrimitiveProps } from '@/components/shared';

export interface InfoFullScreenDialogProps
  extends InfoDialogOverlayPrimitiveProps {
  onClose: () => void;
}
