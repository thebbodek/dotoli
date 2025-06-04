import { OverlayVariant } from '@/components/shared/types';

export const OVERLAY_VARIANTS = {
  MODAL: 'modal',
  BOTTOM_SHEET: 'bottomSheet',
} as const;

export const OVERLAY_CONTENT_POSITION: Record<OverlayVariant, string> = {
  [OVERLAY_VARIANTS.MODAL]: 'flex-h-stack-center',
  [OVERLAY_VARIANTS.BOTTOM_SHEET]: 'flex justify-center items-end',
} as const;

export const OVERLAY_CONTENT_SIZE: Record<OverlayVariant, string> = {
  [OVERLAY_VARIANTS.MODAL]: 'h-auto',
  [OVERLAY_VARIANTS.BOTTOM_SHEET]: 'h-auto',
} as const;
