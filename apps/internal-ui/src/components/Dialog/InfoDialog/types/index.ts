import { DialogFooterSlotProps } from '@/components/Dialog/shared/types';
import { InfoDialogOverlayPrimitiveProps } from '@/components/shared/components/DialogOverlay';

export interface InfoDialogProps
  extends InfoDialogOverlayPrimitiveProps,
    DialogFooterSlotProps {
  confirmOption: { label?: string; onConfirm: () => void };
}
