import { ReactNode } from 'react';

import { AvatarProps } from '@/components/Avatar';
import { PERSONA_PROFILE_THEMES } from '@/components/Persona/constants';

export type PersonaProfileTheme =
  (typeof PERSONA_PROFILE_THEMES)[keyof typeof PERSONA_PROFILE_THEMES];

export interface PersonaProps
  extends Pick<AvatarProps, 'size' | 'src' | 'type' | 'alt'> {
  name: ReactNode;
  description?: ReactNode;
  profileTheme?: PersonaProfileTheme;
}

export interface PersonaProfileProps
  extends Required<Pick<PersonaProps, 'size'>>,
    Pick<PersonaProps, 'name' | 'description' | 'profileTheme'> {}
