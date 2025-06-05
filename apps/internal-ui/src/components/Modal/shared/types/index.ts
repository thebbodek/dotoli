import {
  OverlayDescriptionProps,
  OverlayFooterProps,
  OverlayProps,
  OverlayTitleProps,
} from '@/components/shared/components/Overlay/types';

export interface ModalProps
  extends Pick<OverlayProps, 'isOpen' | 'ref' | 'className'> {}

export interface ModalPrimitiveProps
  extends ModalProps,
    Pick<
      OverlayFooterProps,
      'onConfirm' | 'onCancel' | 'confirmButtonLabel' | 'cancelButtonLabel'
    >,
    Pick<OverlayTitleProps, 'title'>,
    Pick<OverlayDescriptionProps, 'description'> {}
