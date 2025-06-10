import { HTMLAttributes, ReactNode } from 'react';

import { PopoverProps } from '@/components/Popover';
import { TypographyProps } from '@/components/Typography';

export interface InfoPopoverProps
  extends Omit<PopoverProps, 'children'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  title: ReactNode;
  innerClassName?: HTMLAttributes<HTMLDivElement>['className'];
}

export interface InfoPopoverDescriptionProps
  extends Pick<TypographyProps<'p'>, 'className'> {
  description: ReactNode;
}
