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
import { useTooltipOpenEffect } from '@/components/Tooltip/hooks/effects/useUpdateIsOpenEffect';
import { TooltipProps } from '@/components/Tooltip/types';
import { COLOR_STYLES_MAPPER, COLOR_VARIANTS } from '@/variants';

const Tooltip = ({
  content,
  children,
  placement,
  rootClassName,
  className,
  color = COLOR_VARIANTS.WHITE,
  hidden = false,
  isKeepFloating = false,
  id,
  ariaLive,
  role,
  gap = TOOLTIP_GAP,
}: PropsWithChildren<TooltipProps>) => {
  const [isOpen, setIsOpen] = useState(!hidden && isKeepFloating);

  const {
    refs: { setFloating, setReference },
    floatingStyles,
    context,
  } = useFloating({
    open: isOpen,
    placement,
    middleware: [offset(gap), flip(), shift()],
    whileElementsMounted: autoUpdate,
    onOpenChange: (open: boolean) => {
      if (hidden || isKeepFloating) return;

      setIsOpen(open);
    },
  });

  const hover = useHover(context, {
    enabled: !hidden && !isKeepFloating,
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  useTooltipOpenEffect({
    hidden,
    isKeepFloating,
    setIsOpen,
  });

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
            id={id}
            aria-live={ariaLive}
            role={role}
            ref={setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={clsx(
              'text-in-body-12-m rounded-in-4 bg-in-tooltip z-[10000] animate-[fade-in_.1s_ease-in-out_1] break-keep px-2.5 py-1',
              COLOR_STYLES_MAPPER.TEXT[color],
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
