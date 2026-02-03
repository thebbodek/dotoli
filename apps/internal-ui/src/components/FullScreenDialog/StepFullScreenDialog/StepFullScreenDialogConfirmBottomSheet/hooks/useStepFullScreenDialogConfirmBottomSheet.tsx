import dynamic from 'next/dynamic';
import { overlay } from 'overlay-kit';

const StepFullScreenDialogConfirmBottomSheet = dynamic(
  () =>
    import(
      '@/components/FullScreenDialog/StepFullScreenDialog/StepFullScreenDialogConfirmBottomSheet/StepFullScreenDialogConfirmBottomSheet'
    ),
  { ssr: false },
);

const useStepFullScreenDialogConfirmBottomSheet = () => {
  const onStepFullScreenDialogConfirmBottomSheet = (): Promise<boolean> =>
    overlay.openAsync(({ isOpen, close }) => (
      <StepFullScreenDialogConfirmBottomSheet close={close} isOpen={isOpen} />
    ));

  return { onStepFullScreenDialogConfirmBottomSheet };
};

export default useStepFullScreenDialogConfirmBottomSheet;
