import { INPUT_LABEL_STATES } from '@/components/Input/shared/constants';
import { InputLabelState } from '@/components/Input/shared/types';

export const INPUT_FIELD_TYPES = {
  TEXT: 'text',
  PASSWORD: 'password',
  VERIFY: 'verify',
  SELECT: 'select',
} as const;

export const INPUT_FIELD_ICON_KEYS = {
  CLEAR: 'x-circle',
  PASSWORD_HIDDEN: 'eye-slash',
  PASSWORD_VISIBLE: 'eye',
  SELECT: 'caret-down',
  SELECT_OPEN: 'caret-up',
} as const;

export const INPUT_FIELD_ARIA_LABELS = {
  CLEAR: '입력 지우기',
  PASSWORD_SHOW: '비밀번호 표시',
  PASSWORD_HIDE: '비밀번호 숨기기',
} as const;

export const INPUT_FIELD_VERIFY_LABEL = '확인';

export const INPUT_FIELD_SELECT_POPUP_ROLE = 'dialog';

export const INPUT_FIELD_ROOT_STYLE = 'flex-v-stack gap-[6px]';

export const INPUT_FIELD_BOX_STYLE =
  'flex-h-stack h-[70px] w-full items-center gap-[8px] px-[18px] py-[12px]';

export const INPUT_FIELD_CONTENT_STYLE = 'relative h-[46px] min-w-0 flex-1';

export const INPUT_FIELD_LABEL_BASE_STYLE =
  'absolute inset-x-0 block truncate text-left transition-all duration-150';

export const INPUT_FIELD_LABEL_POSITION_STYLES: Record<
  InputLabelState,
  string
> = {
  [INPUT_LABEL_STATES.ACTIVE]: 'top-0 text-label',
  [INPUT_LABEL_STATES.IDLE]: 'top-1/2 -translate-y-1/2 text-body-lg-semibold',
};

export const INPUT_FIELD_VALUE_ROW_STYLE =
  'flex-h-stack absolute inset-x-0 bottom-0 items-center gap-[8px]';

export const INPUT_FIELD_INPUT_STYLE =
  'w-full min-w-0 truncate bg-transparent p-0 text-body-lg-semibold outline-none disabled:cursor-not-allowed';

export const INPUT_FIELD_SELECT_VALUE_STYLE =
  'w-full truncate text-left text-body-lg-semibold';

export const INPUT_FIELD_SELECT_PLACEHOLDER_STYLE =
  'w-full truncate text-left text-body-lg-semibold text-gray-300';

export const INPUT_FIELD_CARET_STYLE = 'shrink-0 text-[18px] text-gray-400';
