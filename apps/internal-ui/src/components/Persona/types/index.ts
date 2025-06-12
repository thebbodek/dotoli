import { AvatarAllProps, ImageAvatarProps } from '@/components/Avatar';
import {
  PERSONA_PROFILE_COLORS,
  PERSONA_TYPES,
} from '@/components/Persona/constants';

export type PersonaType = (typeof PERSONA_TYPES)[keyof typeof PERSONA_TYPES];

export type PersonaProfileColor =
  (typeof PERSONA_PROFILE_COLORS)[keyof typeof PERSONA_PROFILE_COLORS];

export interface PersonaProps
  extends Pick<AvatarAllProps, 'size'>,
    Partial<Pick<ImageAvatarProps, 'src'>> {
  name: string;
  description?: string;
  color?: PersonaProfileColor;
  type?: PersonaType;
}

export interface PersonaAvatarProps
  extends Pick<PersonaProps, 'name' | 'type' | 'src' | 'size'> {}

export interface PersonaProfileProps
  extends Required<Pick<PersonaProps, 'color' | 'size'>>,
    Pick<PersonaProps, 'name' | 'description'> {}
