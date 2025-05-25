import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import clsx from 'clsx';
import { PropsWithChildren, useState } from 'react';

import { TOOLTIP_GAP } from '@/components/Tooltip/constants';
import { TooltipProps } from '@/components/Tooltip/types';

const Tooltip = ({
  content,
  children,
  placement,
  rootClassName,
  className,
  hidden = false,
}: PropsWithChildren<TooltipProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    refs: { setFloating, setReference },
    floatingStyles,
    context,
  } = useFloating({
    open: isOpen,
    placement,
    middleware: [offset(TOOLTIP_GAP), flip(), shift()],
    whileElementsMounted: autoUpdate,
    onOpenChange: (open: boolean) => {
      if (hidden) return;

      setIsOpen(open);
    },
  });

  const hover = useHover(context, {
    enabled: !hidden,
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <div
        ref={setReference}
        {...getReferenceProps()}
        className={rootClassName}
      >
        {children}
      </div>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={clsx(
              'text-body-12-m rounded-4 bg-tooltip z-[10000] animate-[fade-in_.1s_ease-in-out_1] break-keep px-2.5 py-1 text-white',
              className,
            )}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;
