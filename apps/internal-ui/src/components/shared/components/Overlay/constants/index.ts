import { OverlayVariant } from '@/components/shared/components/Overlay/types';

export const OVERLAY_VARIANTS = {
  MODAL: 'MODAL',
  BOTTOM_SHEET: 'BOTTOM_SHEET',
  FULL_SCREEN: 'FULL_SCREEN',
} as const;

export const OVERLAY_CONTENT_POSITION: Record<OverlayVariant, string> = {
  [OVERLAY_VARIANTS.MODAL]: 'in-flex-h-stack-center',
  [OVERLAY_VARIANTS.BOTTOM_SHEET]: 'flex justify-center items-end',
  [OVERLAY_VARIANTS.FULL_SCREEN]: 'in-flex-h-stack-center',
} as const;

export const OVERLAY_CONTENT_SIZE: Record<OverlayVariant, string> = {
  [OVERLAY_VARIANTS.MODAL]: 'h-auto',
  [OVERLAY_VARIANTS.BOTTOM_SHEET]: 'h-auto',
  [OVERLAY_VARIANTS.FULL_SCREEN]: 'h-[100svh]',
} as const;

export const OVERLAY_CONTENT_WRAPPER_ELEMENTS = {
  FORM: 'form',
  DIV: 'div',
} as const;

export const OVERLAY_CONFIRM_TOOLTIP_GAP = 10;
