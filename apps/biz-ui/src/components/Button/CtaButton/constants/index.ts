import {
  CtaButtonSize,
  CtaButtonStyles,
  CtaButtonTheme,
  CtaButtonVariant,
} from '@/components/Button/CtaButton/types';

export const CTA_BUTTON_VARIANTS = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  TONAL: 'tonal',
  TEXT: 'text',
} as const;

export const CTA_BUTTON_THEMES = {
  PRIMARY: 'primary',
  GRAY: 'gray',
  WHITE: 'white',
} as const;

export const CTA_BUTTON_SIZES = {
  XL: 'xl',
  LG: 'lg',
  MD: 'md',
  SM: 'sm',
} as const;

export const CTA_BUTTON_STATES = {
  DEFAULT: 'default',
  HOVER: 'hover',
  PRESSED: 'pressed',
  DISABLED: 'disabled',
} as const;

const CTA_BUTTON_XL_PADDING = 'px-[30px] py-[20px]';

const CTA_BUTTON_XL_ROUNDED = 'rounded-16';

const CTA_BUTTON_XL_TYPOGRAPHY = 'text-heading-2-bold';

export const CTA_BUTTON_SIZE_STYLES: Record<
  CtaButtonSize,
  Record<'HEIGHT' | 'PADDING' | 'ROUNDED' | 'TYPOGRAPHY', string>
> = {
  [CTA_BUTTON_SIZES.XL]: {
    HEIGHT: '',
    PADDING: CTA_BUTTON_XL_PADDING,
    ROUNDED: CTA_BUTTON_XL_ROUNDED,
    TYPOGRAPHY: CTA_BUTTON_XL_TYPOGRAPHY,
  },
  [CTA_BUTTON_SIZES.LG]: {
    HEIGHT: 'h-[52px]',
    PADDING: 'px-[30px] py-[12px]',
    ROUNDED: 'rounded-8',
    TYPOGRAPHY: 'text-body-bold',
  },
  [CTA_BUTTON_SIZES.MD]: {
    HEIGHT: 'h-[40px]',
    PADDING: 'px-[20px] py-[9px]',
    ROUNDED: 'rounded-6',
    TYPOGRAPHY: 'text-body-semibold',
  },
  [CTA_BUTTON_SIZES.SM]: {
    HEIGHT: 'h-[32px]',
    PADDING: 'px-[12px] py-[5px]',
    ROUNDED: 'rounded-6',
    TYPOGRAPHY: 'text-label-bold',
  },
};

export const CTA_BUTTON_TEXT_SIZE_STYLES: Record<
  CtaButtonSize,
  Record<'PADDING' | 'ROUNDED' | 'TYPOGRAPHY', string>
> = {
  [CTA_BUTTON_SIZES.XL]: {
    PADDING: CTA_BUTTON_XL_PADDING,
    ROUNDED: CTA_BUTTON_XL_ROUNDED,
    TYPOGRAPHY: CTA_BUTTON_XL_TYPOGRAPHY,
  },
  [CTA_BUTTON_SIZES.LG]: {
    PADDING: '',
    ROUNDED: 'rounded-8',
    TYPOGRAPHY: 'text-heading-5',
  },
  [CTA_BUTTON_SIZES.MD]: {
    PADDING: '',
    ROUNDED: 'rounded-6',
    TYPOGRAPHY: 'text-body-semibold',
  },
  [CTA_BUTTON_SIZES.SM]: {
    PADDING: '',
    ROUNDED: 'rounded-6',
    TYPOGRAPHY: 'text-label-bold',
  },
};

export const CTA_BUTTON_GAP_STYLES: Record<
  CtaButtonVariant,
  Record<CtaButtonSize, string>
> = {
  [CTA_BUTTON_VARIANTS.FILLED]: {
    [CTA_BUTTON_SIZES.XL]: 'gap-4',
    [CTA_BUTTON_SIZES.LG]: 'gap-1',
    [CTA_BUTTON_SIZES.MD]: 'gap-1',
    [CTA_BUTTON_SIZES.SM]: 'gap-1',
  },
  [CTA_BUTTON_VARIANTS.OUTLINED]: {
    [CTA_BUTTON_SIZES.XL]: 'gap-4',
    [CTA_BUTTON_SIZES.LG]: 'gap-1',
    [CTA_BUTTON_SIZES.MD]: 'gap-1',
    [CTA_BUTTON_SIZES.SM]: 'gap-0.5',
  },
  [CTA_BUTTON_VARIANTS.TONAL]: {
    [CTA_BUTTON_SIZES.XL]: 'gap-4',
    [CTA_BUTTON_SIZES.LG]: 'gap-1',
    [CTA_BUTTON_SIZES.MD]: 'gap-1',
    [CTA_BUTTON_SIZES.SM]: 'gap-1',
  },
  [CTA_BUTTON_VARIANTS.TEXT]: {
    [CTA_BUTTON_SIZES.XL]: 'gap-4',
    [CTA_BUTTON_SIZES.LG]: 'gap-1',
    [CTA_BUTTON_SIZES.MD]: 'gap-1',
    [CTA_BUTTON_SIZES.SM]: 'gap-0.5',
  },
};

export const CTA_BUTTON_ICON_SIZE_STYLES: Record<CtaButtonSize, string> = {
  [CTA_BUTTON_SIZES.XL]: 'text-[34px]',
  [CTA_BUTTON_SIZES.LG]: '',
  [CTA_BUTTON_SIZES.MD]: '',
  [CTA_BUTTON_SIZES.SM]: '',
};

const CTA_BUTTON_PRIMARY_ICON_STYLES: Record<CtaButtonVariant, string> = {
  [CTA_BUTTON_VARIANTS.FILLED]: 'text-white',
  [CTA_BUTTON_VARIANTS.OUTLINED]: 'text-blue-500',
  [CTA_BUTTON_VARIANTS.TONAL]: 'text-blue-500',
  [CTA_BUTTON_VARIANTS.TEXT]: 'text-blue-500',
};

export const CTA_BUTTON_ICON_STYLES: Record<
  CtaButtonTheme,
  Record<CtaButtonVariant, string>
> = {
  [CTA_BUTTON_THEMES.PRIMARY]: CTA_BUTTON_PRIMARY_ICON_STYLES,
  [CTA_BUTTON_THEMES.GRAY]: {
    [CTA_BUTTON_VARIANTS.FILLED]: 'text-white',
    [CTA_BUTTON_VARIANTS.OUTLINED]: 'text-gray-500',
    [CTA_BUTTON_VARIANTS.TONAL]: 'text-gray-500',
    [CTA_BUTTON_VARIANTS.TEXT]: 'text-gray-500',
  },
  [CTA_BUTTON_THEMES.WHITE]: {
    ...CTA_BUTTON_PRIMARY_ICON_STYLES,
    [CTA_BUTTON_VARIANTS.FILLED]: 'text-gray-900',
    [CTA_BUTTON_VARIANTS.TEXT]: 'text-white',
  },
};

export const CTA_BUTTON_DISABLED_ICON_STYLE = 'text-gray-300';

const CTA_BUTTON_PRIMARY_STYLES: Record<CtaButtonVariant, CtaButtonStyles> = {
  [CTA_BUTTON_VARIANTS.FILLED]: {
    [CTA_BUTTON_STATES.DEFAULT]: 'bg-blue-500 text-white',
    [CTA_BUTTON_STATES.HOVER]: 'hover:bg-blue-600',
    [CTA_BUTTON_STATES.PRESSED]: 'active:bg-blue-700',
    [CTA_BUTTON_STATES.DISABLED]: 'bg-gray-100 text-gray-400',
  },
  [CTA_BUTTON_VARIANTS.OUTLINED]: {
    [CTA_BUTTON_STATES.DEFAULT]: 'inset-ring-blue-400 bg-white text-blue-600',
    [CTA_BUTTON_STATES.HOVER]: 'hover:bg-blue-50',
    [CTA_BUTTON_STATES.PRESSED]: 'active:bg-blue-100',
    [CTA_BUTTON_STATES.DISABLED]: 'inset-ring-gray-100 bg-white text-gray-400',
  },
  [CTA_BUTTON_VARIANTS.TONAL]: {
    [CTA_BUTTON_STATES.DEFAULT]: 'bg-blue-100 text-blue-600',
    [CTA_BUTTON_STATES.HOVER]: 'hover:bg-blue-200',
    [CTA_BUTTON_STATES.PRESSED]: 'active:bg-blue-200',
    [CTA_BUTTON_STATES.DISABLED]: 'bg-gray-100 text-gray-400',
  },
  [CTA_BUTTON_VARIANTS.TEXT]: {
    [CTA_BUTTON_STATES.DEFAULT]: 'text-blue-600',
    [CTA_BUTTON_STATES.HOVER]: 'hover:bg-blue-50',
    [CTA_BUTTON_STATES.PRESSED]: 'active:bg-blue-100',
    [CTA_BUTTON_STATES.DISABLED]: 'text-gray-400',
  },
};

export const CTA_BUTTON_STYLES: Record<
  CtaButtonTheme,
  Record<CtaButtonVariant, CtaButtonStyles>
> = {
  [CTA_BUTTON_THEMES.PRIMARY]: CTA_BUTTON_PRIMARY_STYLES,
  [CTA_BUTTON_THEMES.GRAY]: {
    [CTA_BUTTON_VARIANTS.FILLED]: {
      [CTA_BUTTON_STATES.DEFAULT]: 'bg-gray-800 text-white',
      [CTA_BUTTON_STATES.HOVER]: 'hover:bg-gray-900',
      [CTA_BUTTON_STATES.PRESSED]: 'active:bg-gray-900',
      [CTA_BUTTON_STATES.DISABLED]: 'bg-gray-200 text-gray-400',
    },
    [CTA_BUTTON_VARIANTS.OUTLINED]: {
      [CTA_BUTTON_STATES.DEFAULT]: 'inset-ring-gray-200 bg-white text-gray-800',
      [CTA_BUTTON_STATES.HOVER]: 'hover:bg-gray-50',
      [CTA_BUTTON_STATES.PRESSED]: 'active:bg-gray-50',
      [CTA_BUTTON_STATES.DISABLED]:
        'inset-ring-gray-200 bg-white text-gray-500',
    },
    [CTA_BUTTON_VARIANTS.TONAL]: {
      [CTA_BUTTON_STATES.DEFAULT]: 'bg-gray-100 text-gray-800',
      [CTA_BUTTON_STATES.HOVER]: 'hover:bg-gray-200',
      [CTA_BUTTON_STATES.PRESSED]: 'active:bg-gray-200',
      [CTA_BUTTON_STATES.DISABLED]: 'bg-gray-200 text-gray-500',
    },
    [CTA_BUTTON_VARIANTS.TEXT]: {
      [CTA_BUTTON_STATES.DEFAULT]: 'text-gray-800',
      [CTA_BUTTON_STATES.HOVER]: 'hover:bg-gray-50',
      [CTA_BUTTON_STATES.PRESSED]: 'active:bg-gray-50',
      [CTA_BUTTON_STATES.DISABLED]: 'text-gray-500',
    },
  },
  [CTA_BUTTON_THEMES.WHITE]: {
    ...CTA_BUTTON_PRIMARY_STYLES,
    [CTA_BUTTON_VARIANTS.FILLED]: {
      [CTA_BUTTON_STATES.DEFAULT]: 'bg-white text-gray-900',
      [CTA_BUTTON_STATES.HOVER]: 'hover:bg-gray-50',
      [CTA_BUTTON_STATES.PRESSED]: 'active:bg-gray-100',
      [CTA_BUTTON_STATES.DISABLED]: 'bg-gray-200 text-gray-400',
    },
    [CTA_BUTTON_VARIANTS.TEXT]: {
      [CTA_BUTTON_STATES.DEFAULT]: 'text-white',
      [CTA_BUTTON_STATES.HOVER]: 'hover:bg-white/10',
      [CTA_BUTTON_STATES.PRESSED]: 'active:bg-white/20',
      [CTA_BUTTON_STATES.DISABLED]: 'text-gray-400',
    },
  },
};

export const CTA_BUTTON_UNDERLINE_STYLE = 'underline underline-offset-3';

export const CTA_BUTTON_LABEL_STACK_STYLE =
  'flex-v-stack items-start gap-0.5 text-left';
