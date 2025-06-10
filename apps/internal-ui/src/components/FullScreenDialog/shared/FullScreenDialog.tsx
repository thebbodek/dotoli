import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import FullScreenDialogContentWrapper from '@/components/FullScreenDialog/shared/FullScreenDialogContentWrapper';
import FullScreenDialogHeader from '@/components/FullScreenDialog/shared/FullScreenDialogHeader';
import {
  Overlay,
  OVERLAY_VARIANTS,
  OverlayDivider,
} from '@/components/shared/components/Overlay';
import { FullScreenDialogProps } from '@/components/FullScreenDialog/shared/types';

const FullScreenDialog = ({
  isOpen,
  ref,
  children,
  className,
}: PropsWithChildren<FullScreenDialogProps>) => {
  return (
    <Overlay variant={OVERLAY_VARIANTS.MODAL} isOpen={isOpen} ref={ref} dimmed>
      <div
        className={clsx(
          className,
          'flex-v-stack h-screen w-screen overflow-hidden bg-white',
        )}
      >
        {children}
      </div>
    </Overlay>
  );
};

export default FullScreenDialog;

FullScreenDialog.displayName = 'FullScreenDialog';
FullScreenDialog.Header = FullScreenDialogHeader;
FullScreenDialog.ContentWrapper = FullScreenDialogContentWrapper;
FullScreenDialog.Divider = OverlayDivider;
