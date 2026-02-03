import { ConfirmBottomSheet } from '@/components/BottomSheet';
import { OverlayAsyncProps } from '@/components/shared';

const StepFullScreenDialogConfirmBottomSheet = ({
  isOpen,
  close,
}: Pick<OverlayAsyncProps<boolean>, 'close' | 'isOpen'>) => {
  return (
    <ConfirmBottomSheet
      confirmOption={{
        label: '닫기',
        onConfirm: () => close(true),
        tooltipOption: {
          useTooltip: false,
        },
      }}
      title={
        <>
          작성을 종료하고 닫으시겠습니까?
          <br />
          입력한 내용은 저장되지 않습니다
        </>
      }
      cancelOption={{ onCancel: () => close(false) }}
      className='min-w-in-mobile w-svw'
      isOpen={isOpen}
      possibleConfirm
    />
  );
};

export default StepFullScreenDialogConfirmBottomSheet;
