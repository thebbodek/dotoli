import {
  InputConditionState,
  InputConditionStyles,
  InputState,
  InputTextStyles,
} from '@/components/Input/shared/types';

export const INPUT_STATES = {
  DEFAULT: 'default',
  ERROR: 'error',
  DISABLED: 'disabled',
} as const;

export const INPUT_LABEL_STATES = {
  ACTIVE: 'active',
  IDLE: 'idle',
} as const;

export const INPUT_CONDITION_STATES = {
  SATISFIED: 'satisfied',
  UNSATISFIED: 'unsatisfied',
} as const;

export const INPUT_DEFAULT_MAX_LENGTH = 200;

export const INPUT_BOX_BASE_STYLE = 'relative rounded-6 inset-ring';

export const INPUT_BOX_STYLES: Record<InputState, string> = {
  [INPUT_STATES.DEFAULT]:
    'bg-white inset-ring-gray-200 focus-within:inset-ring-2 focus-within:inset-ring-blue-400',
  [INPUT_STATES.ERROR]: 'bg-white inset-ring-2 inset-ring-red-400',
  [INPUT_STATES.DISABLED]: 'cursor-not-allowed bg-gray-50 inset-ring-gray-200',
};

export const INPUT_TEXT_STYLES: Record<InputState, InputTextStyles> = {
  [INPUT_STATES.DEFAULT]: {
    LABEL: {
      [INPUT_LABEL_STATES.ACTIVE]: 'text-gray-600',
      [INPUT_LABEL_STATES.IDLE]: 'text-gray-500',
    },
    VALUE: 'text-gray-800',
  },
  [INPUT_STATES.ERROR]: {
    LABEL: {
      [INPUT_LABEL_STATES.ACTIVE]: 'text-red-500',
      [INPUT_LABEL_STATES.IDLE]: 'text-red-500',
    },
    VALUE: 'text-gray-800',
  },
  [INPUT_STATES.DISABLED]: {
    LABEL: {
      [INPUT_LABEL_STATES.ACTIVE]: 'text-gray-400',
      [INPUT_LABEL_STATES.IDLE]: 'text-gray-400',
    },
    VALUE: 'text-gray-500',
  },
};

export const INPUT_PLACEHOLDER_STYLE = 'placeholder:text-gray-300';

export const INPUT_MESSAGE_ICON_KEYS = {
  ERROR: 'warning-circle',
  CONDITION: 'check-circle',
} as const;

export const INPUT_CONDITION_STATE_LABELS: Record<InputConditionState, string> =
  {
    [INPUT_CONDITION_STATES.SATISFIED]: '충족',
    [INPUT_CONDITION_STATES.UNSATISFIED]: '미충족',
  };

export const INPUT_MESSAGE_ROW_STYLE =
  'flex-h-stack w-full items-center gap-[2px] text-caption';

export const INPUT_MESSAGE_BODY_STYLE =
  'flex-h-stack min-w-0 flex-1 items-center';

export const INPUT_COUNTER_STYLE =
  'ml-auto shrink-0 whitespace-nowrap text-gray-300';

export const INPUT_COUNTER_CURRENT_STYLE = 'text-gray-800';

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
