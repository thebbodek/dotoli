import { LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from 'react';

import { ButtonPrimitiveProps } from '@/components/Button/shared';
import { ComponentPropsRef } from '@/components/shared/types';

export interface LinkButtonProps
  extends ComponentPropsRef<HTMLAnchorElement>,
    ButtonPrimitiveProps,
    LinkProps,
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target'> {}
