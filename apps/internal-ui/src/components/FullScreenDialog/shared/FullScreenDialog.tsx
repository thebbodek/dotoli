import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import FullScreenDialogContentWrapper from '@/components/FullScreenDialog/shared/FullScreenDialogContentWrapper';
import FullScreenDialogHeader from '@/components/FullScreenDialog/shared/FullScreenDialogHeader';
import { FullScreenDialogProps } from '@/components/FullScreenDialog/shared/types';
import { Overlay, OVERLAY_VARIANTS, OverlayDivider } from '@/components/shared';

const FullScreenDialog = ({
  isOpen,
  ref,
  children,
  className,
}: PropsWithChildren<FullScreenDialogProps>) => {
  return (
    <Overlay
      isOpen={isOpen}
      ref={ref}
      variant={OVERLAY_VARIANTS.FULL_SCREEN}
      dimmed
    >
      <div
        className={clsx(
          className,
          'in-flex-v-stack bg-in-white w-full overflow-hidden',
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
