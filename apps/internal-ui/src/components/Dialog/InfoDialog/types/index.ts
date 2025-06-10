import { DialogOverlayProps } from '@/components/shared/components/DialogOverlay';

export interface InfoDialogProps
  extends Omit<
      DialogOverlayProps,
      'onCancel' | 'cancelButtonLabel' | 'confirmButtonLabel'
    >,
    Partial<Pick<DialogOverlayProps, 'confirmButtonLabel'>> {}
