import { composeEventHandler, executeFunction, mergeRefs } from '@bbodek/utils';
import { isValidElement, MouseEvent, useId, useState } from 'react';

import {
  ChildPropsParams,
  TriggerPropsParams,
  UsePopoverProps,
  UsePopoverReturn,
} from '@/components/Popover/Popover/types';
import { ComponentPropsRef } from '@/components/shared';

const usePopover = ({
  trigger,
  children,
  useHover = false,
}: UsePopoverProps): UsePopoverReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const child = typeof children === 'function' ? children({ close }) : children;
  const {
    ref: triggerPrimitiveRef,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...restTriggerProps
  } = trigger.props;
  const {
    id: childId,
    ref: childPrimitiveRef,
    style: childStyle,
    ...restChildProps
  } = child.props;
  const popoverId = childId || useId();

  const composedClick = composeEventHandler({
    internalEventHandler: (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      executeFunction({
        disabled: useHover,
        fn: () => setIsOpen((v) => !v),
      });
    },
    externalEventHandler: onClick,
  });

  const composedMouseEnter = composeEventHandler({
    internalEventHandler: (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      executeFunction({
        disabled: !useHover,
        fn: () => setIsOpen(true),
      });
    },
    externalEventHandler: onMouseEnter,
  });

  const composedMouseLeave = composeEventHandler({
    internalEventHandler: (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      executeFunction({
        disabled: !useHover,
        fn: () => setIsOpen(false),
      });
    },
    externalEventHandler: onMouseLeave,
  });

  const triggerProps = ({ triggerRef }: TriggerPropsParams) => {
    return {
      ...restTriggerProps,
      ref: (triggerPrimitiveRef
        ? mergeRefs(triggerPrimitiveRef, triggerRef)
        : triggerRef) as ComponentPropsRef<HTMLElement>['ref'],
      onClick: composedClick,
      onMouseEnter: composedMouseEnter,
      onMouseLeave: composedMouseLeave,
      'aria-haspopup': 'dialog' as const,
      'aria-expanded': isOpen,
      'aria-controls': isOpen ? popoverId : undefined,
    };
  };

  const childProps = ({ popoverRef, popoverStyle }: ChildPropsParams) => {
    return {
      ...restChildProps,
      ref: (childPrimitiveRef
        ? mergeRefs(childPrimitiveRef, popoverRef)
        : popoverRef) as ComponentPropsRef<HTMLElement>['ref'],
      style: {
        ...childStyle,
        ...popoverStyle,
      },
      role: 'dialog',
      id: popoverId,
      tabIndex: -1,
    };
  };

  return {
    isOpen,
    isValidElements: isValidElement(trigger) && isValidElement(child),
    child,
    triggerProps,
    childProps,
    close,
  };
};

export default usePopover;
