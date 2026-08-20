import { TYPOGRAPHY_ELEMENTS } from '@/components/Typography';

export const CONFIRM_MODAL_TITLE_ELEMENTS = {
  P: TYPOGRAPHY_ELEMENTS.P,
  H1: TYPOGRAPHY_ELEMENTS.H1,
  H2: TYPOGRAPHY_ELEMENTS.H2,
  H3: TYPOGRAPHY_ELEMENTS.H3,
  H4: TYPOGRAPHY_ELEMENTS.H4,
  H5: TYPOGRAPHY_ELEMENTS.H5,
  H6: TYPOGRAPHY_ELEMENTS.H6,
} as const;

export const CONFIRM_MODAL_DEFAULT_TITLE_ELEMENT =
  CONFIRM_MODAL_TITLE_ELEMENTS.P;

export const CONFIRM_MODAL_BASE_STYLE =
  'flex-v-stack w-[320px] items-center rounded-16 bg-white pt-[13px]';

export const CONFIRM_MODAL_TEXT_STYLE =
  'flex-v-stack w-full items-center gap-[8px] px-[20px] pt-[24px] pb-[10px] text-center whitespace-pre-line';

export const CONFIRM_MODAL_ACTIONS_STYLE =
  'flex-h-stack w-full items-start gap-[8px] px-[20px] pt-[12px] pb-[18px]';

export const CONFIRM_MODAL_BUTTON_STYLE = 'min-w-0 flex-1';
