import {
  CtaButtonBaseProps,
  CtaButtonSizeProps,
} from '@/components/Button/CtaButton/types';
import { LinkButtonPrimitiveProps } from '@/components/Button/shared/types';

export interface LinkCtaButtonBaseProps
  extends Omit<
      CtaButtonBaseProps,
      'disabled' | 'isPending' | 'onClick' | 'ref' | 'type'
    >,
    LinkButtonPrimitiveProps {}

export type LinkCtaButtonProps = LinkCtaButtonBaseProps & CtaButtonSizeProps;
