import { IconButtonProps } from '@/components/Button/IconButton/types';
import { LinkButtonPrimitiveProps } from '@/components/Button/shared/types';

export interface LinkIconButtonProps
  extends Omit<
      IconButtonProps,
      'disabled' | 'isPending' | 'onClick' | 'onMouseDown' | 'ref' | 'type'
    >,
    LinkButtonPrimitiveProps {}
