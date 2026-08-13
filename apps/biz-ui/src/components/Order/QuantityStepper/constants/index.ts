import {
  QuantityStepperState,
  QuantityStepperStateStyles,
  QuantityStepperStyles,
} from '@/components/Order/QuantityStepper/types';
import { COLOR_VARIANTS } from '@/variants';

export const QUANTITY_STEPPER_MAX = 100;

export const QUANTITY_STEPPER_STATES = {
  EMPTY: 'empty',
  FILLED: 'filled',
  ERROR: 'error',
} as const;

export const QUANTITY_STEPPER_BASE_STYLE = 'flex-v-stack gap-[12px]';

export const QUANTITY_STEPPER_PRODUCT_STYLE =
  'flex-v-stack w-full items-center gap-[2px]';

export const QUANTITY_STEPPER_IMAGE_STYLE =
  'h-[80px] w-full rounded-8 object-contain';

export const QUANTITY_STEPPER_CONTROL_STYLE =
  'flex-v-stack w-full items-center gap-[11px]';

export const QUANTITY_STEPPER_ROW_STYLE =
  'flex-h-stack w-full items-center gap-[6px]';

export const QUANTITY_STEPPER_INPUT_STYLE =
  'rounded-6 text-heading-5 h-[47px] min-w-0 flex-1 bg-gray-50 px-[18px] text-center text-gray-900 outline-none placeholder:text-gray-300';

export const QUANTITY_STEPPER_TOTAL_STYLE =
  'flex-h-stack-center rounded-full px-[12px] py-[2px]';

export const QUANTITY_STEPPER_PLACEHOLDER = '얼마나 시킬까요';

export const QUANTITY_STEPPER_INPUT_MODE = 'numeric';

export const QUANTITY_STEPPER_ICON_KEYS = {
  DECREASE: 'minus',
  INCREASE: 'plus',
} as const;

export const QUANTITY_STEPPER_ARIA_LABELS = {
  DECREASE: '수량 줄이기',
  INCREASE: '수량 늘리기',
} as const;

export const QUANTITY_STEPPER_STYLES: QuantityStepperStyles = {
  NAME: COLOR_VARIANTS.GRAY_800,
  MESSAGE: COLOR_VARIANTS.RED_400,
};

export const QUANTITY_STEPPER_STATE_STYLES: Record<
  QuantityStepperState,
  QuantityStepperStateStyles
> = {
  [QUANTITY_STEPPER_STATES.EMPTY]: {
    INPUT: 'inset-ring inset-ring-gray-200',
    TOTAL: 'bg-gray-50',
    TOTAL_LABEL: COLOR_VARIANTS.GRAY_300,
  },
  [QUANTITY_STEPPER_STATES.FILLED]: {
    INPUT: 'inset-ring inset-ring-gray-200',
    TOTAL: 'bg-blue-50',
    TOTAL_LABEL: COLOR_VARIANTS.BLUE_500,
  },
  [QUANTITY_STEPPER_STATES.ERROR]: {
    INPUT: 'inset-ring-2 inset-ring-red-400',
    TOTAL: 'bg-red-50',
    TOTAL_LABEL: COLOR_VARIANTS.RED_500,
  },
};
