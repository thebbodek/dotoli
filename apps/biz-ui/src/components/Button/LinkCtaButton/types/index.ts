import { CtaButtonProps } from '@/components/Button/CtaButton/types';
import { LinkButtonPrimitiveProps } from '@/components/Button/shared/types';

export interface LinkCtaButtonProps
  extends Omit<
      CtaButtonProps,
      'disabled' | 'isPending' | 'onClick' | 'ref' | 'type'
    >,
    LinkButtonPrimitiveProps {}
