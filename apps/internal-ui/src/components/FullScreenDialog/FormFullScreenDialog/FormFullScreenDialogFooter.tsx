import { BUTTON_SIZES } from '@/components/Button';
import { FormFullScreenDialogProps } from '@/components/FullScreenDialog/FormFullScreenDialog/types';
import {
  OverlayFooterCancelButton,
  OverlayFooterConfirmButton,
  OverlayFooterWrapper,
} from '@/components/shared';

const FormFullScreenDialogFooter = ({
  cancelOption,
  confirmOption,
  isLoading,
  isPending,
  possibleConfirm,
}: Pick<
  FormFullScreenDialogProps,
  | 'cancelOption'
  | 'confirmOption'
  | 'isLoading'
  | 'isPending'
  | 'possibleConfirm'
>) => {
  const defaultButtonProps = {
    className: 'flex-1 max-w-[calc(50%-4px)]',
    size: BUTTON_SIZES.MD,
  };

  return (
    <OverlayFooterWrapper className='border-t-in-gray-02 border-t px-5 py-3'>
      <OverlayFooterCancelButton
        {...defaultButtonProps}
        cancelOption={cancelOption}
        isLoading={isLoading}
        isPending={isPending}
      />
      <OverlayFooterConfirmButton
        {...defaultButtonProps}
        confirmOption={confirmOption}
        isLoading={isLoading}
        possibleConfirm={possibleConfirm && !isPending}
      />
    </OverlayFooterWrapper>
  );
};

export default FormFullScreenDialogFooter;
