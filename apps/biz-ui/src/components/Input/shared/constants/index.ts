import {
  InputConditionState,
  InputConditionStyles,
  InputState,
} from '@/components/Input/shared/types';

/**
 * @description: Figma의 state 7종은 「스타일 상태 × 값 유무」 두 축입니다. 값 유무는
 * 라벨 위치만 바꾸므로 스타일 상태는 이 3종으로 접힙니다.
 * */
export const INPUT_STATES = {
  DEFAULT: 'default',
  ERROR: 'error',
  DISABLED: 'disabled',
} as const;

export const INPUT_CONDITION_STATES = {
  SATISFIED: 'satisfied',
  UNSATISFIED: 'unsatisfied',
} as const;

/**
 * @description: internal-ui와 같은 값입니다 (DOTOLI-128에서 정한 input 200 / textarea 5000).
 * TextArea 몫은 그 티켓에서 추가합니다.
 * */
export const INPUT_DEFAULT_MAX_LENGTH = 200;

/**
 * @description: 테두리를 `border`가 아니라 `inset-ring`(box-shadow)으로 그립니다.
 * 두께가 상태별로 1px↔2px로 바뀌는데 `border`는 그때마다 콘텐츠를 안쪽으로 밀어
 * 포커스할 때마다 글자가 튑니다. Figma가 inside stroke라 안쪽 여백이 두께와 무관하게
 * 18px인 것과도 이쪽이 맞습니다.
 * */
export const INPUT_BOX_BASE_STYLE = 'relative rounded-md inset-ring';

export const INPUT_BOX_STYLES: Record<InputState, string> = {
  [INPUT_STATES.DEFAULT]:
    'bg-white inset-ring-gray-200 focus-within:inset-ring-2 focus-within:inset-ring-blue-400',
  [INPUT_STATES.ERROR]: 'bg-white inset-ring-2 inset-ring-red-400',
  [INPUT_STATES.DISABLED]: 'cursor-not-allowed bg-gray-50 inset-ring-gray-200',
};

export const INPUT_MESSAGE_ICON_KEYS = {
  ERROR: 'warning-circle',
  CONDITION: 'check-circle',
} as const;

/**
 * @description: 색으로만 갈리는 충족 여부를 스크린리더에도 전달합니다. 시각 표현은
 * Figma가 정한 대로 두고 비시각 정보만 덧붙입니다.
 * */
export const INPUT_CONDITION_STATE_LABELS: Record<InputConditionState, string> =
  {
    [INPUT_CONDITION_STATES.SATISFIED]: '충족',
    [INPUT_CONDITION_STATES.UNSATISFIED]: '미충족',
  };

export const INPUT_MESSAGE_BASE_STYLE =
  'flex-h-stack items-center text-caption';

/**
 * @description: 아이콘 14px, 라벨 12px(`caption`)로 크기가 다릅니다. Phosphor는 아이콘
 * 폰트라 상속된 12px을 따르므로 여기서만 크기를 지정합니다.
 * */
export const INPUT_MESSAGE_ICON_STYLE = 'shrink-0 text-[14px]';

export const INPUT_ERROR_MESSAGE_STYLES = {
  CONTAINER: 'gap-[2px] text-red-400',
  ICON: 'text-red-300',
} as const;

export const INPUT_CONDITION_LIST_STYLE = 'flex-wrap gap-x-[6px]';

export const INPUT_CONDITION_ITEM_STYLE = 'flex-h-stack items-center gap-[2px]';

export const INPUT_CONDITION_STYLES: Record<
  InputConditionState,
  InputConditionStyles
> = {
  [INPUT_CONDITION_STATES.SATISFIED]: {
    ICON: 'text-blue-400',
    LABEL: 'text-blue-600',
  },
  [INPUT_CONDITION_STATES.UNSATISFIED]: {
    ICON: 'text-gray-400',
    LABEL: 'text-gray-600',
  },
};
