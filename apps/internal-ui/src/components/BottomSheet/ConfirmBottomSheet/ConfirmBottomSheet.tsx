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
  possibleConfirm,
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
        cancelOption={cancelOption}
        confirmOption={confirmOption}
        isLoading={isLoading}
        isPending={isPending}
        possibleConfirm={possibleConfirm}
      />
    </BottomSheet>
  );
};

export default ConfirmBottomSheet;

ConfirmBottomSheet.displayName = 'ConfirmBottomSheet';
ConfirmBottomSheet.Description = ConfirmOverlayDescription;
