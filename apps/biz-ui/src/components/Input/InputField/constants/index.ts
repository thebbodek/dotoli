import {
  InputFieldLabelState,
  InputFieldStateStyles,
} from '@/components/Input/InputField/types';
import { INPUT_STATES } from '@/components/Input/shared/constants';
import { InputState } from '@/components/Input/shared/types';

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
} as const;

export const INPUT_FIELD_ARIA_LABELS = {
  CLEAR: '입력 지우기',
  PASSWORD_SHOW: '비밀번호 표시',
  PASSWORD_HIDE: '비밀번호 숨기기',
} as const;

export const INPUT_FIELD_VERIFY_LABEL = '확인';

/**
 * @description: `select`는 바텀시트 트리거입니다. 열림 상태(`aria-expanded`)는 시트를
 * 여는 쪽이 알기 때문에 여기서 채우지 못하고, 팝업 종류만 정적으로 알립니다.
 * */
export const INPUT_FIELD_SELECT_POPUP_ROLE = 'dialog';

/**
 * @description: 폭을 고정하지 않습니다. 블록 레벨 flex 컨테이너라 부모 폭을 그대로 채우고,
 * `w-full`을 넣으면 소비자가 `className`으로 주는 폭을 덮어씁니다.
 * */
export const INPUT_FIELD_ROOT_STYLE = 'flex-v-stack gap-[6px]';

export const INPUT_FIELD_BOX_STYLE =
  'flex-h-stack h-[70px] w-full items-center gap-[8px] px-[18px] py-[12px]';

/**
 * @description: 라벨 20px + 값 26px = 46px. 박스 70px에서 상하 패딩 12px씩을 뺀 값입니다.
 * */
export const INPUT_FIELD_CONTENT_STYLE = 'relative h-[46px] min-w-0 flex-1';

export const INPUT_FIELD_LABEL_STATES = {
  FLOATING: 'floating',
  COLLAPSED: 'collapsed',
} as const;

/**
 * @description: 인풋은 항상 하단 행에 있고 라벨만 절대배치로 움직입니다. 레이아웃이
 * 바뀌지 않으니 커서·값이 튀지 않습니다.
 *
 * 처음엔 `group-[:not([data-filled]):not(:focus-within)]`로 CSS만 써서 리렌더를 없애려
 * 했는데, 브라우저가 중첩 `:is()`/`:not()` 안의 `:focus-within` 변화에 스타일을
 * 무효화하지 않아 포커스해도 라벨이 그대로였습니다(강제 재계산하면 정상 적용). 그래서
 * 포커스만 상태로 뺐습니다. 박스 테두리의 `focus-within:`은 중첩이 없어 정상 동작합니다.
 *
 * `pointer-events`를 죽이지 않습니다. 인풋이 콘텐츠 46px 중 하단 26px에만 있어서
 * 라벨 자리를 탭하면 아무 일도 안 일어나는데, `<label htmlFor>`를 그대로 두면
 * 브라우저가 알아서 인풋으로 포커스를 넘겨 줍니다.
 * */
export const INPUT_FIELD_LABEL_BASE_STYLE =
  'absolute inset-x-0 block truncate text-left transition-all duration-150';

export const INPUT_FIELD_LABEL_POSITION_STYLES: Record<
  InputFieldLabelState,
  string
> = {
  [INPUT_FIELD_LABEL_STATES.FLOATING]: 'top-0 text-label',
  [INPUT_FIELD_LABEL_STATES.COLLAPSED]:
    'top-1/2 -translate-y-1/2 text-body-lg-semibold',
};

export const INPUT_FIELD_VALUE_ROW_STYLE =
  'flex-h-stack absolute inset-x-0 bottom-0 items-center gap-[8px]';

/**
 * @description: 안내문구는 포커스일 때만 보입니다. 값이 없고 포커스도 아닐 때는 라벨이
 * 그 자리를 덮고 있어서, `placeholder` 자체를 그때만 넘깁니다.
 * */
export const INPUT_FIELD_INPUT_STYLE =
  'w-full min-w-0 truncate bg-transparent p-0 text-body-lg-semibold outline-none placeholder:text-gray-300 disabled:cursor-not-allowed';

export const INPUT_FIELD_SELECT_VALUE_STYLE =
  'w-full truncate text-left text-body-lg-semibold';

export const INPUT_FIELD_SELECT_PLACEHOLDER_STYLE =
  'w-full truncate text-left text-body-lg-semibold text-gray-300';

export const INPUT_FIELD_CARET_STYLE = 'shrink-0 text-[18px] text-gray-400';

export const INPUT_FIELD_STYLES: Record<InputState, InputFieldStateStyles> = {
  [INPUT_STATES.DEFAULT]: {
    LABEL: {
      [INPUT_FIELD_LABEL_STATES.FLOATING]: 'text-gray-600',
      [INPUT_FIELD_LABEL_STATES.COLLAPSED]: 'text-gray-500',
    },
    VALUE: 'text-gray-800',
  },
  [INPUT_STATES.ERROR]: {
    LABEL: {
      [INPUT_FIELD_LABEL_STATES.FLOATING]: 'text-red-500',
      [INPUT_FIELD_LABEL_STATES.COLLAPSED]: 'text-red-500',
    },
    VALUE: 'text-gray-800',
  },
  [INPUT_STATES.DISABLED]: {
    LABEL: {
      [INPUT_FIELD_LABEL_STATES.FLOATING]: 'text-gray-400',
      [INPUT_FIELD_LABEL_STATES.COLLAPSED]: 'text-gray-400',
    },
    VALUE: 'text-gray-500',
  },
};
