import { Avatar } from '@/components/Avatar';
import {
  PERSONA_ICON_KEYS,
  PERSONA_TYPES,
} from '@/components/Persona/constants';
import { PersonaAvatarProps } from '@/components/Persona/types';

const PersonaAvatar = ({
  src,
  name,
  type = PERSONA_TYPES.SINGLE,
  size,
}: PersonaAvatarProps) => {
  const iconKey = PERSONA_ICON_KEYS[type];

  if (!src) {
    return <Avatar variant='icon' iconKey={iconKey} size={size} />;
  }

  return (
    <Avatar
      variant='image'
      src={src}
      alt={name}
      fallbackIconKey={iconKey}
      size={size}
    />
  );
};

export default PersonaAvatar;
