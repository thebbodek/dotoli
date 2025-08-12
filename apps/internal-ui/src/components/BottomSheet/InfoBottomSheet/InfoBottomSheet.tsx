import { InfoBottomSheetProps } from '@/components/BottomSheet/InfoBottomSheet/types';
import BottomSheet from '@/components/BottomSheet/shared/BottomSheet';
import { OverlayDescription, OverlayTitle } from '@/components/shared';

const InfoBottomSheet = ({
  ref,
  isOpen,
  title,
  children,
  confirmOption,
  cancelOption = { label: '닫기' },
  isLoading,
  className,
}: InfoBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} ref={ref} className={className}>
      <BottomSheet.ContentWrapper
        isLoading={isLoading}
        className='in-flex-v-stack gap-y-3'
      >
        <header>
          <OverlayTitle title={title} />
        </header>
        {children}
      </BottomSheet.ContentWrapper>
      <BottomSheet.Footer
        confirmOption={confirmOption}
        cancelOption={cancelOption}
        possibleConfirm
      />
    </BottomSheet>
  );
};

export default InfoBottomSheet;

InfoBottomSheet.displayName = 'InfoBottomSheet';
InfoBottomSheet.Description = OverlayDescription;
