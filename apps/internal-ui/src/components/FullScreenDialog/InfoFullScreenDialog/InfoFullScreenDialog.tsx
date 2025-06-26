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
    <FullScreenDialog isOpen={isOpen} ref={ref} className={className}>
      <FullScreenDialog.Header onCancel={onClose} title={title} />
      <FullScreenDialog.ContentWrapper isLoading={isLoading}>
        {children}
      </FullScreenDialog.ContentWrapper>
    </FullScreenDialog>
  );
};

export default InfoFullScreenDialog;
