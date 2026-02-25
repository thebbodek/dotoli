import { Avatar, AVATAR_SIZES } from '@/components/Avatar';
import { Flex } from '@/components/Flex';
import { PERSONA_SIZE_FLEX_PROPS } from '@/components/Persona/constants';
import PersonaProfile from '@/components/Persona/PersonaProfile';
import { PersonaProps } from '@/components/Persona/types';

const Persona = ({
  size = AVATAR_SIZES.SM,
  type,
  name,
  alt,
  description,
  src,
  profileTheme,
}: PersonaProps) => {
  return (
    <Flex {...PERSONA_SIZE_FLEX_PROPS[size].root} align={{ items: 'center' }}>
      <Avatar alt={alt} size={size} src={src} type={type} />
      <PersonaProfile
        description={description}
        name={name}
        profileTheme={profileTheme}
        size={size}
      />
    </Flex>
  );
};

export default Persona;
