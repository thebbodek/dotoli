import { IconStyle, PhosphorIcon } from '@phosphor-icons/core';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  iconKey: PhosphorIcon['name'];
  weight?: `${IconStyle}`;
}
