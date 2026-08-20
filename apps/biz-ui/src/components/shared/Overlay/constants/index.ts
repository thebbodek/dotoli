import { OverlayVariant } from '@/components/shared/Overlay/types';

export const OVERLAY_VARIANTS = {
  MODAL: 'modal',
  BOTTOM_SHEET: 'bottom-sheet',
} as const;

export const OVERLAY_ESCAPE_KEY = 'Escape';

export const OVERLAY_DIALOG_ATTRIBUTE = 'data-overlay';

export const OVERLAY_DIALOG_SELECTOR = `dialog[${OVERLAY_DIALOG_ATTRIBUTE}]`;

export const OVERLAY_BASE_STYLE =
  'fixed inset-0 z-[1000] m-0 h-full max-h-none w-full max-w-none overflow-hidden bg-transparent p-0';

export const OVERLAY_POSITION_STYLES: Record<OverlayVariant, string> = {
  [OVERLAY_VARIANTS.MODAL]: 'flex-h-stack-center',
  [OVERLAY_VARIANTS.BOTTOM_SHEET]: 'flex-h-stack items-end',
};

export const OVERLAY_BACKDROP_BASE_STYLE = 'absolute inset-0';

export const OVERLAY_DIM_STYLE = 'animate-fade-in bg-dim';

export const OVERLAY_CONTENT_BASE_STYLE = 'relative';

export const OVERLAY_CONTENT_STYLES: Record<OverlayVariant, string> = {
  [OVERLAY_VARIANTS.MODAL]: 'animate-popup',
  [OVERLAY_VARIANTS.BOTTOM_SHEET]: 'animate-bottom-sheet w-full',
};
