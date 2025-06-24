import { PersonaProps } from '@/components/Persona';
import { TooltipProps } from '@/components/Tooltip';

export type AvatarGroupItem = Pick<PersonaProps, 'name' | 'src' | 'type'>;

export interface AvatarGroupProps {
  items: AvatarGroupItem[];
  total?: number;
  tooltipClassName?: TooltipProps['className'];
}
