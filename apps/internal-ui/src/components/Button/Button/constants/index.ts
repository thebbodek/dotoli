import {
  ButtonColors,
  ButtonSizes,
  ButtonStatus,
  ButtonVariants,
} from '@/components/Button/Button';

export const BUTTON_ELEMENTS = {
  BUTTON: 'button',
  LINK: 'a',
} as const;

export const BUTTON_VARIANTS = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  TONAL: 'tonal',
  TEXT: 'text',
} as const;

export const BUTTON_COLORS = {
  PRIMARY: 'primary',
  GRAY: 'gray',
} as const;

export const BUTTON_SIZES = {
  LARGE: 'lg',
  MEDIUM: 'md',
  SMALL: 'sm',
  X_SMALL: 'xs',
} as const;

export const BUTTON_STATUS = {
  DEFAULT: 'default',
  DISABLED: 'disabled',
} as const;

export const BUTTON_OUTLINED_DEFAULT_STYLES = 'border box-border';

export const BUTTON_STYLES_MAPPER: Record<
  ButtonColors,
  Partial<Record<ButtonVariants, Record<ButtonStatus, string>>>
> = {
  [BUTTON_COLORS.PRIMARY]: {
    [BUTTON_VARIANTS.FILLED]: {
      [BUTTON_STATUS.DEFAULT]: 'bg-primary-06 text-white hover:bg-primary-07',
      [BUTTON_STATUS.DISABLED]: 'bg-gray-02 text-gray-05',
    },
    [BUTTON_VARIANTS.OUTLINED]: {
      [BUTTON_STATUS.DEFAULT]: `${BUTTON_OUTLINED_DEFAULT_STYLES} border-primary-02 bg-white text-primary-07 hover:bg-primary-01`,
      [BUTTON_STATUS.DISABLED]: `${BUTTON_OUTLINED_DEFAULT_STYLES} border-gray-03 text-gray-05 bg-white`,
    },
    [BUTTON_VARIANTS.TONAL]: {
      [BUTTON_STATUS.DEFAULT]:
        'bg-primary-02 text-primary-06 hover:bg-primary-03',
      [BUTTON_STATUS.DISABLED]: 'bg-gray-01 text-gray-04',
    },
    [BUTTON_VARIANTS.TEXT]: {
      [BUTTON_STATUS.DEFAULT]: 'text-primary-06',
      [BUTTON_STATUS.DISABLED]: 'text-gray-04',
    },
  },
  [BUTTON_COLORS.GRAY]: {
    [BUTTON_VARIANTS.OUTLINED]: {
      [BUTTON_STATUS.DEFAULT]: `${BUTTON_OUTLINED_DEFAULT_STYLES} bg-white border-gray-02 text-gray-07 hover:bg-gray-01`,
      [BUTTON_STATUS.DISABLED]: `${BUTTON_OUTLINED_DEFAULT_STYLES} text-gray-04 bg-white`,
    },
    [BUTTON_VARIANTS.TONAL]: {
      [BUTTON_STATUS.DEFAULT]: 'bg-gray-01 text-gray-07 hover:bg-gray-02',
      [BUTTON_STATUS.DISABLED]: 'text-gray-04 bg-gray-01',
    },
    [BUTTON_VARIANTS.TEXT]: {
      [BUTTON_STATUS.DEFAULT]: 'text-gray-07',
      [BUTTON_STATUS.DISABLED]: 'text-gray-04',
    },
  },
} as const;

export const BUTTON_SIZE_STYLES_MAPPER: Record<ButtonSizes, string> = {
  [BUTTON_SIZES.LARGE]: 'text-body-16-b rounded-8 h-12',
  [BUTTON_SIZES.MEDIUM]: 'text-body-16-m rounded-8 h-10',
  [BUTTON_SIZES.SMALL]: 'text-body-14-m rounded-6 h-8',
  [BUTTON_SIZES.X_SMALL]: 'text-body-12-m rounded-6 h-[1.625rem]',
} as const;

export const BUTTON_PADDING_STYLES_MAPPER: Record<ButtonSizes, string> = {
  [BUTTON_SIZES.LARGE]: 'px-10',
  [BUTTON_SIZES.MEDIUM]: 'px-5',
  [BUTTON_SIZES.SMALL]: 'px-[0.875rem]',
  [BUTTON_SIZES.X_SMALL]: 'px-[0.625rem]',
} as const;

export const BUTTON_GAP_STYLES_MAPPER: Record<ButtonSizes, string> = {
  [BUTTON_SIZES.LARGE]: 'gap-x-1',
  [BUTTON_SIZES.MEDIUM]: 'gap-x-2',
  [BUTTON_SIZES.SMALL]: 'gap-x-2',
  [BUTTON_SIZES.X_SMALL]: 'gap-x-2',
} as const;
