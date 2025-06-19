import { PersonaAvatarProps } from '@/components/Persona';
import { TooltipProps } from '@/components/Tooltip';

export type AvatarGroupItem = Pick<PersonaAvatarProps, 'name' | 'src' | 'type'>;

export interface AvatarGroupProps {
  items: AvatarGroupItem[];
  total?: number;
  tooltipClassName?: TooltipProps['className'];
}
