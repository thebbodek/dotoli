import { PropsWithChildren } from 'react';

import { FullScreenDialog } from '@/components/shared';
import { SideSheetFullScreenDialogProps } from '@/components/SideSheet/types';

const SideSheetFullScreenDialog = ({
  isOpen,
  title,
  isLoading,
  className,
  children,
  onClose,
}: PropsWithChildren<SideSheetFullScreenDialogProps>) => {
  return (
    <FullScreenDialog className={className} isOpen={isOpen}>
      <FullScreenDialog.Header title={title} onClose={onClose} />
      <FullScreenDialog.ContentWrapper isLoading={isLoading}>
        {children}
      </FullScreenDialog.ContentWrapper>
    </FullScreenDialog>
  );
};

export default SideSheetFullScreenDialog;
