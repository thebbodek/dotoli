import { ConfirmBottomSheetProps } from '@/components/BottomSheet/ConfirmBottomSheet/types';
import BottomSheet from '@/components/BottomSheet/shared/BottomSheet';
import {
  ConfirmOverlayContent,
  ConfirmOverlayDescription,
} from '@/components/shared';

const ConfirmBottomSheet = ({
  ref,
  isOpen,
  title,
  children,
  iconOptions,
  useIcon,
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  possibleConfirm,
  isPending,
  className,
}: ConfirmBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} ref={ref} className={className}>
      <BottomSheet.ContentWrapper>
        <ConfirmOverlayContent
          title={title}
          iconOptions={iconOptions}
          useIcon={useIcon}
        />
        {children}
      </BottomSheet.ContentWrapper>
      <BottomSheet.Footer
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmButtonLabel={confirmButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        possibleConfirm={possibleConfirm}
        isPending={isPending}
      />
    </BottomSheet>
  );
};

export default ConfirmBottomSheet;

ConfirmBottomSheet.displayName = 'ConfirmBottomSheet';
ConfirmBottomSheet.Description = ConfirmOverlayDescription;
