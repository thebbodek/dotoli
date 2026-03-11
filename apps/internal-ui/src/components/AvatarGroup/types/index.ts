import { PersonaProps } from '@/components/Persona';
import { TooltipProps } from '@/components/Tooltip';

export interface AvatarGroupItem extends Pick<PersonaProps, 'src' | 'type'> {
  name: string;
}

export interface AvatarGroupProps {
  items: AvatarGroupItem[];
  total?: number;
  tooltipClassName?: TooltipProps['className'];
}
