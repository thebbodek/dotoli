import { ModalVariantsType } from '@/components/Modal/ModalBase/types';

export const MODAL_VARIANTS = {
  MODAL: 'modal',
  BOTTOM_SHEET: 'bottomSheet',
  DRAWER: 'drawer',
} as const;

export const MODAL_CONTENT_POSITION: Record<ModalVariantsType, string> = {
  [MODAL_VARIANTS.MODAL]: 'fixed flex-h-stack-center z-50',
  [MODAL_VARIANTS.DRAWER]: 'flex justify-end z-40',
  [MODAL_VARIANTS.BOTTOM_SHEET]: 'fixed flex justify-center items-end z-50',
} as const;

export const MODAL_CONTENT_SIZE: Record<ModalVariantsType, string> = {
  [MODAL_VARIANTS.MODAL]: 'h-auto',
  [MODAL_VARIANTS.DRAWER]: 'h-full',
  [MODAL_VARIANTS.BOTTOM_SHEET]: 'h-auto',
} as const;
