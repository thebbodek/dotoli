import { mergeRefs } from '@bbodek/utils';
import { useId } from 'react';

import {
  PopoverPropsParams,
  TriggerPropsParams,
  UsePopoverProps,
  UsePopoverReturn,
} from '@/components/Popover/Popover/types';
import { ComponentPropsRef } from '@/components/shared/types';

const usePopover = ({ trigger, isOpen }: UsePopoverProps): UsePopoverReturn => {
  const popoverId = useId();
  const { ref: triggerPrimitiveRef, ...restTriggerProps } = trigger.props;

  const triggerProps = ({ triggerRef }: TriggerPropsParams) => {
    return {
      ...restTriggerProps,
      ref: (triggerPrimitiveRef
        ? mergeRefs(triggerPrimitiveRef, triggerRef)
        : triggerRef) as ComponentPropsRef<HTMLElement>['ref'],
      'aria-haspopup': 'dialog' as const,
      'aria-expanded': isOpen,
      'aria-controls': isOpen ? popoverId : undefined,
    };
  };

  const popoverProps = ({ popoverRef, style }: PopoverPropsParams) => {
    return {
      ref: popoverRef,
      role: 'dialog',
      id: popoverId,
      style,
      tabIndex: -1,
    };
  };

  return {
    triggerProps,
    popoverProps,
  };
};

export default usePopover;
