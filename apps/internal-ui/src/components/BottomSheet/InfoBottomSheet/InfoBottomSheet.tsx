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
    <BottomSheet className={className} isOpen={isOpen} ref={ref}>
      <BottomSheet.ContentWrapper
        className='in-flex-v-stack gap-y-3'
        isLoading={isLoading}
      >
        <header>
          <OverlayTitle title={title} />
        </header>
        {children}
      </BottomSheet.ContentWrapper>
      <BottomSheet.Footer
        cancelOption={cancelOption}
        confirmOption={confirmOption}
        possibleConfirm
      />
    </BottomSheet>
  );
};

export default InfoBottomSheet;

InfoBottomSheet.displayName = 'InfoBottomSheet';
InfoBottomSheet.Description = OverlayDescription;
