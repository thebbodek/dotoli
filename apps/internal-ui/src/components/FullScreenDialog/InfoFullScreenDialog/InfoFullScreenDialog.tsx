import { InfoFullScreenDialogProps } from '@/components/FullScreenDialog/InfoFullScreenDialog/types';
import { FullScreenDialog } from '@/components/shared';

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
      <FullScreenDialog.ContentWrapper isLoading={isLoading} hasPadding>
        {children}
      </FullScreenDialog.ContentWrapper>
    </FullScreenDialog>
  );
};

export default InfoFullScreenDialog;
