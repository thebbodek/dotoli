import { AVATAR_SIZES } from '@/components/Avatar';
import { IconProps } from '@/components/Icon';
import { PersonaProfileColor, PersonaType } from '@/components/Persona/types';
import { TypographyProps } from '@/components/Typography';

export const PERSONA_TYPES = {
  SINGLE: 'single',
  GROUP: 'group',
} as const;

export const PERSONA_PROFILE_COLORS = {
  BLACK: 'black',
  WHITE: 'white',
} as const;

export const PERSONA_ICON_KEYS: Record<PersonaType, IconProps['iconKey']> = {
  [PERSONA_TYPES.SINGLE]: 'user',
  [PERSONA_TYPES.GROUP]: 'users-three',
};

export const PERSONA_SIZE_FLEX_PROPS = {
  [AVATAR_SIZES.SM]: {
    root: { className: 'gap-x-1.5' },
    profile: { align: { items: 'center' }, gap: { row: 1 } },
  },
  [AVATAR_SIZES.MD]: {
    root: { className: 'gap-x-2.5' },
    profile: { direction: 'column', className: '-space-y-0.5' },
  },
} as const;

export const PERSONA_PROFILE_NAME_COLOR_STYLES: Record<
  PersonaProfileColor,
  TypographyProps<'strong'>['color']
> = {
  [PERSONA_PROFILE_COLORS.BLACK]: 'black',
  [PERSONA_PROFILE_COLORS.WHITE]: 'white',
};
