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
    <Overlay variant={OVERLAY_VARIANTS.MODAL} isOpen={isOpen} ref={ref} dimmed>
      <div
        className={clsx(
          className,
          'rounded-16 shadow-24 flex-v-stack max-h-[86dvh] bg-white',
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
