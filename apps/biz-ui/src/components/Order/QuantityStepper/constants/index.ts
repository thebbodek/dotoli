import {
  QuantityStepperState,
  QuantityStepperStateStyles,
} from '@/components/Order/QuantityStepper/types';
import { COLOR_VARIANTS } from '@/variants';

export const QUANTITY_STEPPER_MAX = 100;

export const QUANTITY_STEPPER_STATES = {
  EMPTY: 'empty',
  FILLED: 'filled',
  ERROR: 'error',
  WARNING: 'warning',
} as const;

export const QUANTITY_STEPPER_BASE_STYLE = 'flex-v-stack gap-[8px] py-[12px]';

export const QUANTITY_STEPPER_BODY_STYLE =
  'flex-v-stack w-full items-end gap-[4px]';

export const QUANTITY_STEPPER_ROW_STYLE =
  'flex-h-stack w-full items-center gap-[12px]';

export const QUANTITY_STEPPER_NAME_STYLE = 'min-w-0 flex-1';

export const QUANTITY_STEPPER_CONTROL_STYLE =
  'flex-h-stack shrink-0 items-center gap-[6px]';

export const QUANTITY_STEPPER_BUTTON_STYLE = 'inset-ring inset-ring-gray-200';

export const QUANTITY_STEPPER_INPUT_STYLE =
  'rounded-6 text-heading-5 h-[40px] w-[72px] bg-gray-50 px-[13px] text-center text-gray-900 outline-none placeholder:text-gray-300';

export const QUANTITY_STEPPER_MESSAGE_STYLE = 'w-full text-right';

export const QUANTITY_STEPPER_PLACEHOLDER = '0';

export const QUANTITY_STEPPER_INPUT_MODE = 'numeric';

export const QUANTITY_STEPPER_ICON_KEYS = {
  DECREASE: 'minus',
  INCREASE: 'plus',
} as const;

export const QUANTITY_STEPPER_ARIA_LABELS = {
  DECREASE: '수량 줄이기',
  INCREASE: '수량 늘리기',
} as const;

export const QUANTITY_STEPPER_NAME_COLOR = COLOR_VARIANTS.GRAY_800;

export const QUANTITY_STEPPER_STATE_STYLES: Record<
  QuantityStepperState,
  QuantityStepperStateStyles
> = {
  [QUANTITY_STEPPER_STATES.EMPTY]: {
    INPUT: 'inset-ring inset-ring-gray-200',
    TOTAL: COLOR_VARIANTS.GRAY_300,
  },
  [QUANTITY_STEPPER_STATES.FILLED]: {
    INPUT: 'inset-ring inset-ring-gray-200',
    TOTAL: COLOR_VARIANTS.BLUE_500,
  },
  [QUANTITY_STEPPER_STATES.ERROR]: {
    INPUT: 'inset-ring-2 inset-ring-red-400',
    TOTAL: COLOR_VARIANTS.RED_500,
    MESSAGE: COLOR_VARIANTS.RED_400,
  },
  [QUANTITY_STEPPER_STATES.WARNING]: {
    INPUT: 'inset-ring-2 inset-ring-yellow-400',
    TOTAL: COLOR_VARIANTS.YELLOW_600,
    MESSAGE: COLOR_VARIANTS.YELLOW_600,
  },
};
