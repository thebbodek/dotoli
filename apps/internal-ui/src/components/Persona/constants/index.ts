import { AVATAR_SIZES } from '@/components/Avatar';

export const PERSONA_PROFILE_THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export const PERSONA_SIZE_FLEX_PROPS = {
  [AVATAR_SIZES.SM]: {
    root: { className: 'gap-x-1.5' },
    profile: { align: { items: 'center' }, gap: { row: '4' } },
  },
  [AVATAR_SIZES.MD]: {
    root: { className: 'gap-x-2.5' },
    profile: { direction: 'column', className: '-space-y-0.5' },
  },
} as const;

export const PERSONA_PROFILE_THEME_TYPOGRAPHY_PROPS = {
  [PERSONA_PROFILE_THEMES.DARK]: {
    name: { color: 'white' },
    description: { color: 'gray-05' },
  },
  [PERSONA_PROFILE_THEMES.LIGHT]: {
    name: { color: 'black' },
    description: { color: 'gray-05' },
  },
} as const;
