import { cloneElement, isValidElement, MouseEvent, useState } from 'react';

import { usePopoverPosition } from '@/components/Popover/Popover/hooks';
import { PopoverProps } from '@/components/Popover/Popover/types';
import { Portal } from '@/components/Portal';
import { composeEventHandler, executeFunction, mergeRefs } from '@bbodek/utils';

const Popover = ({
  trigger,
  children,
  popoverOptions,
  useHover = false,
  applyMaxWidth = false,
}: PopoverProps) => {
  const { gap = 4 } = popoverOptions ?? {};
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const isFunction = typeof children === 'function';
  const child = isFunction ? children({ close }) : children;
  const {
    ref: triggerPrimitiveRef,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...restTriggerProps
  } = trigger.props;
  const {
    ref: childPrimitiveRef,
    style: childStyle,
    ...restChildProps
  } = child.props;
  const { triggerRef, popoverRef, style } = usePopoverPosition<HTMLDivElement>({
    isOpen,
    gap,
    applyMaxWidth,
    close,
  });

  const composedClick = composeEventHandler({
    internalEventHandler: (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      executeFunction({
        disabled: useHover,
        fn: () => {
          setIsOpen((v) =>
            isFunction && v
              ? popoverRef.current!.contains(e.target as Node)
              : !v,
          );
        },
      });
    },
    externalEventHandler: onClick,
  });

  const composedMouseEnter = composeEventHandler({
    internalEventHandler: (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      executeFunction({
        disabled: useHover,
        fn: () => setIsOpen(true),
      });
    },
    externalEventHandler: onMouseEnter,
  });

  const composedMouseLeave = composeEventHandler({
    internalEventHandler: (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      executeFunction({
        disabled: useHover,
        fn: () => setIsOpen(false),
      });
    },
    externalEventHandler: onMouseLeave,
  });

  if (!isValidElement(trigger) || !isValidElement(child)) return null;

  return (
    <>
      {cloneElement(trigger, {
        ...restTriggerProps,
        ref: triggerPrimitiveRef
          ? mergeRefs(triggerPrimitiveRef, triggerRef)
          : triggerRef,
        onClick: composedClick,
        onMouseEnter: composedMouseEnter,
        onMouseLeave: composedMouseLeave,
      })}
      {isOpen && (
        <Portal>
          {cloneElement(child, {
            ...restChildProps,
            ref: childPrimitiveRef
              ? mergeRefs(childPrimitiveRef, popoverRef)
              : popoverRef,
            style: {
              ...style,
              ...childStyle,
            },
          })}
        </Portal>
      )}
    </>
  );
};

export default Popover;
