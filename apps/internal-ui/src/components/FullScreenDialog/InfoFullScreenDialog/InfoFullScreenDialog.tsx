import { InfoFullScreenDialogProps } from '@/components/FullScreenDialog/InfoFullScreenDialog/types';
import FullScreenDialog from '@/components/FullScreenDialog/shared/FullScreenDialog';

const InfoFullScreenDialog = ({
  children,
  isOpen,
  ref,
  title,
  className,
  isLoading,
  onClose,
}: InfoFullScreenDialogProps) => {
  return (
    <FullScreenDialog className={className} isOpen={isOpen} ref={ref}>
      <FullScreenDialog.Header title={title} onClose={onClose} />
      <FullScreenDialog.ContentWrapper isLoading={isLoading}>
        {children}
      </FullScreenDialog.ContentWrapper>
    </FullScreenDialog>
  );
};

export default InfoFullScreenDialog;
