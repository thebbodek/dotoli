import { AVATAR_SIZES } from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import {
  PERSONA_PROFILE_COLORS,
  PERSONA_SIZE_FLEX_PROPS,
} from '@/components/Persona/constants';
import PersonaAvatar from '@/components/Persona/PersonaAvatar';
import PersonaProfile from '@/components/Persona/PersonaProfile';
import { PersonaProps } from './types';

const Persona = ({
  name,
  description,
  src,
  color = PERSONA_PROFILE_COLORS.BLACK,
  size = AVATAR_SIZES.SM,
  type,
}: PersonaProps) => {
  return (
    <Flex align={{ items: 'center' }} {...PERSONA_SIZE_FLEX_PROPS[size].root}>
      <PersonaAvatar src={src} name={name} type={type} size={size} />
      <PersonaProfile
        name={name}
        description={description}
        size={size}
        color={color}
      />
    </Flex>
  );
};

export default Persona;
