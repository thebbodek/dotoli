import {
  DialogOverlayProps,
  InfoDialogOverlayPrimitiveProps,
} from '@/components/shared/components/DialogOverlay';

export interface InfoDialogProps
  extends InfoDialogOverlayPrimitiveProps,
    Pick<DialogOverlayProps, 'onConfirm'>,
    Partial<Pick<DialogOverlayProps, 'confirmButtonLabel'>> {}
