import { Flex } from '@/components/Flex';
import {
  PERSONA_PROFILE_NAME_COLOR_STYLES,
  PERSONA_SIZE_FLEX_PROPS,
} from '@/components/Persona/constants';
import { PersonaProfileProps } from '@/components/Persona/types';
import { Typography } from '@/components/Typography';

const PersonaProfile = ({
  name,
  description,
  size,
  color,
}: PersonaProfileProps) => {
  return (
    <Flex {...PERSONA_SIZE_FLEX_PROPS[size].profile}>
      <Typography
        as='strong'
        variant='body-14-m'
        color={PERSONA_PROFILE_NAME_COLOR_STYLES[color]}
      >
        {name}
      </Typography>
      {description && (
        <Typography variant='body-12-m' color='gray-05'>
          {description}
        </Typography>
      )}
    </Flex>
  );
};

export default PersonaProfile;
