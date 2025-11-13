import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import DialogContentWrapper from '@/components/Dialog/shared/DialogContentWrapper';
import DialogFooter from '@/components/Dialog/shared/DialogFooter';
import DialogHeader from '@/components/Dialog/shared/DialogHeader';
import { DialogProps } from '@/components/Dialog/shared/types';
import { Overlay, OVERLAY_VARIANTS, OverlayDivider } from '@/components/shared';

const Dialog = ({
  isOpen,
  ref,
  children,
  className,
}: PropsWithChildren<DialogProps>) => {
  return (
    <Overlay isOpen={isOpen} ref={ref} variant={OVERLAY_VARIANTS.MODAL} dimmed>
      <div
        className={clsx(
          className,
          'rounded-in-16 shadow-in-24 in-flex-v-stack bg-in-white max-h-[86dvh]',
        )}
      >
        {children}
      </div>
    </Overlay>
  );
};

export default Dialog;

Dialog.displayName = 'Dialog';
Dialog.Header = DialogHeader;
Dialog.ContentWrapper = DialogContentWrapper;
Dialog.Footer = DialogFooter;
Dialog.Divider = OverlayDivider;
