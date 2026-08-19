import { ToggleProps } from '@/components/Toggle';

export interface ToggleListItemProps
  extends Omit<
    ToggleProps,
    'aria-describedby' | 'aria-label' | 'aria-labelledby'
  > {
  label: string;
  description: string;
}
