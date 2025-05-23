import { LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from 'react';

import { ComponentPropsRef } from '@/components/shared';
import { ButtonDefaultProps } from '@/components/Button/shared';

export interface LinkButtonProps
  extends ComponentPropsRef<HTMLAnchorElement>,
    ButtonDefaultProps,
    LinkProps,
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'className'> {}
