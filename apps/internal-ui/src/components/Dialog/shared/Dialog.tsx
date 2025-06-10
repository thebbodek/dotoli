import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import DialogContentWrapper from '@/components/Dialog/shared/DialogContentWrapper';
import DialogFooter from '@/components/Dialog/shared/DialogFooter';
import DialogHeader from '@/components/Dialog/shared/DialogHeader';
import {
  Overlay,
  OVERLAY_VARIANTS,
  OverlayDivider,
} from '@/components/shared/components/Overlay';
import { DialogProps } from '@/components/Dialog/shared/types';

const Dialog = ({
  isOpen,
  ref,
  children,
  className,
}: PropsWithChildren<DialogProps>) => {
  return (
    <Overlay variant={OVERLAY_VARIANTS.MODAL} isOpen={isOpen} ref={ref} dimmed>
      <div className={clsx(className, 'rounded-16 shadow-24 bg-white')}>
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
