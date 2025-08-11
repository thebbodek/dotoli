import { InfoDialogOverlayPrimitiveProps } from '@/components/shared/components/DialogOverlay';

export interface InfoDialogProps extends InfoDialogOverlayPrimitiveProps {
  confirmOption: { label?: string; onConfirm: () => void };
}
