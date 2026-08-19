import { SearchInputState } from '@/components/Input/SearchInput/types';

export const SEARCH_INPUT_STATES = {
  DEFAULT: 'default',
  TYPING: 'typing',
  FILL: 'fill',
  ERROR: 'error',
} as const;

export const SEARCH_INPUT_PLACEHOLDER = '검색해보세요';

export const SEARCH_INPUT_ICON_KEYS = {
  SEARCH: 'magnifying-glass',
  CLEAR: 'x-circle',
} as const;

export const SEARCH_INPUT_ARIA_LABELS = {
  CLEAR: '검색어 지우기',
} as const;

export const SEARCH_INPUT_DEFAULT_AUTO_COMPLETE = 'off';

export const SEARCH_INPUT_ROOT_STYLE = 'flex-v-stack gap-[6px]';

export const SEARCH_INPUT_BOX_BASE_STYLE =
  'flex-h-stack h-[48px] w-full items-center gap-[8px] bg-gray-50 px-[18px]';

/**
 * @description: `type='search'`가 WebKit에서 붙이는 기본 지우기 버튼을 없앱니다.
 * 지우기는 `IconButton`이 맡으므로 두면 같은 자리에 두 개가 겹칩니다.
 * */
export const SEARCH_INPUT_FIELD_STYLE =
  'min-w-0 flex-1 truncate bg-transparent p-0 text-body-lg-semibold text-gray-800 outline-none [&::-webkit-search-cancel-button]:appearance-none';

export const SEARCH_INPUT_SEARCH_ICON_STYLE =
  'shrink-0 text-[24px] text-gray-400';

export const SEARCH_INPUT_BOX_STATE_STYLES: Record<SearchInputState, string> = {
  [SEARCH_INPUT_STATES.DEFAULT]: 'inset-ring-gray-200',
  [SEARCH_INPUT_STATES.TYPING]: 'inset-ring-2 inset-ring-blue-400',
  [SEARCH_INPUT_STATES.FILL]: 'inset-ring-gray-200',
  [SEARCH_INPUT_STATES.ERROR]: 'inset-ring-2 inset-ring-red-400',
};

export const SEARCH_INPUT_CLEAR_STATES: readonly SearchInputState[] = [
  SEARCH_INPUT_STATES.TYPING,
  SEARCH_INPUT_STATES.ERROR,
];
