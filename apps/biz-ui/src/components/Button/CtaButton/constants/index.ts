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
} as const;

export const CTA_BUTTON_SIZES = {
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

export const CTA_BUTTON_SIZE_STYLES: Record<
  CtaButtonSize,
  Record<'HEIGHT' | 'PADDING' | 'ROUNDED' | 'GAP' | 'TYPOGRAPHY', string>
> = {
  [CTA_BUTTON_SIZES.LG]: {
    HEIGHT: 'h-[52px]',
    PADDING: 'px-[30px] py-[12px]',
    ROUNDED: 'rounded-8',
    GAP: 'gap-1',
    TYPOGRAPHY: 'text-body-bold',
  },
  [CTA_BUTTON_SIZES.MD]: {
    HEIGHT: 'h-[40px]',
    PADDING: 'px-[20px] py-[9px]',
    ROUNDED: 'rounded-6',
    GAP: 'gap-1',
    TYPOGRAPHY: 'text-body-semibold',
  },
  [CTA_BUTTON_SIZES.SM]: {
    HEIGHT: 'h-[32px]',
    PADDING: 'px-[12px] py-[5px]',
    ROUNDED: 'rounded-6',
    GAP: 'gap-1',
    TYPOGRAPHY: 'text-label-bold',
  },
};

/**
 * @description: text variant는 배경·높이·패딩이 없어 radius와 타이포만 사이즈별로 둡니다.
 * */
export const CTA_BUTTON_TEXT_SIZE_STYLES: Record<
  CtaButtonSize,
  Record<'ROUNDED' | 'GAP' | 'TYPOGRAPHY', string>
> = {
  [CTA_BUTTON_SIZES.LG]: {
    ROUNDED: 'rounded-8',
    GAP: 'gap-1',
    TYPOGRAPHY: 'text-heading-5',
  },
  [CTA_BUTTON_SIZES.MD]: {
    ROUNDED: 'rounded-6',
    GAP: 'gap-1',
    TYPOGRAPHY: 'text-body-semibold',
  },
  [CTA_BUTTON_SIZES.SM]: {
    ROUNDED: 'rounded-6',
    GAP: 'gap-0.5',
    TYPOGRAPHY: 'text-label-bold',
  },
};

/**
 * @description: `hover:` 래핑 정책은 CLAUDE.md [hover / pressed]를 따릅니다.
 * */
export const CTA_BUTTON_STYLES: Record<
  CtaButtonTheme,
  Record<CtaButtonVariant, CtaButtonStyles>
> = {
  [CTA_BUTTON_THEMES.PRIMARY]: {
    [CTA_BUTTON_VARIANTS.FILLED]: {
      [CTA_BUTTON_STATES.DEFAULT]: 'bg-blue-500 text-white',
      [CTA_BUTTON_STATES.HOVER]: 'hover:bg-blue-600',
      [CTA_BUTTON_STATES.PRESSED]: 'active:bg-blue-700',
      [CTA_BUTTON_STATES.DISABLED]: 'bg-gray-100 text-gray-400',
    },
    [CTA_BUTTON_VARIANTS.OUTLINED]: {
      [CTA_BUTTON_STATES.DEFAULT]: 'border-blue-400 bg-white text-blue-600',
      [CTA_BUTTON_STATES.HOVER]: 'hover:bg-blue-50',
      [CTA_BUTTON_STATES.PRESSED]: 'active:bg-blue-100',
      [CTA_BUTTON_STATES.DISABLED]: 'border-gray-100 bg-white text-gray-400',
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
  },
  [CTA_BUTTON_THEMES.GRAY]: {
    [CTA_BUTTON_VARIANTS.FILLED]: {
      [CTA_BUTTON_STATES.DEFAULT]: 'bg-gray-800 text-white',
      [CTA_BUTTON_STATES.HOVER]: 'hover:bg-gray-900',
      [CTA_BUTTON_STATES.PRESSED]: 'active:bg-gray-900',
      [CTA_BUTTON_STATES.DISABLED]: 'bg-gray-200 text-gray-400',
    },
    [CTA_BUTTON_VARIANTS.OUTLINED]: {
      [CTA_BUTTON_STATES.DEFAULT]: 'border-gray-200 bg-white text-gray-800',
      [CTA_BUTTON_STATES.HOVER]: 'hover:bg-gray-50',
      [CTA_BUTTON_STATES.PRESSED]: 'active:bg-gray-50',
      [CTA_BUTTON_STATES.DISABLED]: 'border-gray-200 bg-white text-gray-500',
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
};
