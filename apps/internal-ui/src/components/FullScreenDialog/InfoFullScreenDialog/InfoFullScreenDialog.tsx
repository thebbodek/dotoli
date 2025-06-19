import { InfoFullScreenDialogProps } from '@/components/FullScreenDialog/InfoFullScreenDialog/types';
import FullScreenDialog from '@/components/FullScreenDialog/shared/FullScreenDialog';

const InfoFullScreenDialog = ({
  children,
  isOpen,
  ref,
  title,
  className,
  onClose,
}: InfoFullScreenDialogProps) => {
  return (
    <FullScreenDialog isOpen={isOpen} ref={ref} className={className}>
      <FullScreenDialog.Header onCancel={onClose} title={title} />
      <FullScreenDialog.ContentWrapper>
        {children}
      </FullScreenDialog.ContentWrapper>
    </FullScreenDialog>
  );
};

export default InfoFullScreenDialog;
