import { ConfirmModal } from '@/components/Modal';
import { OverlayAsyncProps } from '@/components/shared';

const StepDialogConfirmModal = ({
  isOpen,
  close,
}: Pick<OverlayAsyncProps<boolean>, 'close' | 'isOpen'>) => {
  return (
    <ConfirmModal
      confirmOption={{
        label: '닫기',
        onConfirm: () => close(true),
        tooltipOption: {
          useTooltip: false,
        },
      }}
      title={
        <>
          작성을 종료하고 닫으시겠습니까? <br />
          입력한 내용은 저장되지 않습니다
        </>
      }
      cancelOption={{ onCancel: () => close(false) }}
      className='w-[21.875rem]'
      isOpen={isOpen}
      possibleConfirm
    />
  );
};

export default StepDialogConfirmModal;
