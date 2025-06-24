import { Avatar, AVATAR_SIZES } from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { PERSONA_SIZE_FLEX_PROPS } from '@/components/Persona/constants';
import PersonaProfile from '@/components/Persona/PersonaProfile';
import { PersonaProps } from '@/components/Persona/types';

const Persona = ({
  size = AVATAR_SIZES.SM,
  type,
  name,
  description,
  src,
  profileTheme,
}: PersonaProps) => {
  return (
    <Flex {...PERSONA_SIZE_FLEX_PROPS[size].root} align={{ items: 'center' }}>
      <Avatar src={src} alt={name} type={type} size={size} />
      <PersonaProfile
        name={name}
        description={description}
        size={size}
        profileTheme={profileTheme}
      />
    </Flex>
  );
};

export default Persona;
