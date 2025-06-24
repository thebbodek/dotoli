import { Flex } from '@/components/Flex';
import {
  PERSONA_PROFILE_THEME_TYPOGRAPHY_PROPS,
  PERSONA_PROFILE_THEMES,
  PERSONA_SIZE_FLEX_PROPS,
} from '@/components/Persona/constants';
import { PersonaProfileProps } from '@/components/Persona/types';
import { Typography } from '@/components/Typography';

const PersonaProfile = ({
  name,
  description,
  size,
  profileTheme = PERSONA_PROFILE_THEMES.LIGHT,
}: PersonaProfileProps) => {
  const typographyProps = PERSONA_PROFILE_THEME_TYPOGRAPHY_PROPS[profileTheme];

  return (
    <Flex {...PERSONA_SIZE_FLEX_PROPS[size].profile}>
      <Typography {...typographyProps.name} as='strong' variant='body-14-m'>
        {name}
      </Typography>
      {description && (
        <Typography {...typographyProps.description} variant='body-12-m'>
          {description}
        </Typography>
      )}
    </Flex>
  );
};

export default PersonaProfile;
