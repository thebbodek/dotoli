import dynamic from 'next/dynamic';
import { overlay } from 'overlay-kit';

const StepDialogConfirmModal = dynamic(
  () =>
    import(
      '@/components/Dialog/StepDialog/StepDialogConfirmModal/StepDialogConfirmModal'
    ),
  { ssr: false },
);

const useStepDialogConfirmModal = () => {
  const onStepDialogConfirmModal = (): Promise<boolean> =>
    overlay.openAsync(({ isOpen, close }) => (
      <StepDialogConfirmModal close={close} isOpen={isOpen} />
    ));

  return { onStepDialogConfirmModal };
};

export default useStepDialogConfirmModal;
