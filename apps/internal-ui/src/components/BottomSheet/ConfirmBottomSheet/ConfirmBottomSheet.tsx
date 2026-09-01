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
  iconOption,
  useIcon,
  confirmOption,
  cancelOption,
  canConfirm,
  isPending,
  isLoading,
  className,
}: ConfirmBottomSheetProps) => {
  return (
    <BottomSheet className={className} isOpen={isOpen} ref={ref}>
      <BottomSheet.ContentWrapper isLoading={isLoading}>
        <ConfirmOverlayContent
          iconOption={iconOption}
          title={title}
          useIcon={useIcon}
        />
        {children}
      </BottomSheet.ContentWrapper>
      <BottomSheet.Footer
        canConfirm={canConfirm}
        cancelOption={cancelOption}
        confirmOption={confirmOption}
        isLoading={isLoading}
        isPending={isPending}
      />
    </BottomSheet>
  );
};

export default ConfirmBottomSheet;

ConfirmBottomSheet.displayName = 'ConfirmBottomSheet';
ConfirmBottomSheet.Description = ConfirmOverlayDescription;
