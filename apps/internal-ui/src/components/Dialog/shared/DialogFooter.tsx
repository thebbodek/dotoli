import clsx from 'clsx';

import { BUTTON_SIZES } from '@/components/Button';
import { DIALOG_FOOTER_DEFAULT_STYLES } from '@/components/Dialog/shared/constants';
import { DialogFooterProps } from '@/components/Dialog/shared/types';
import {
  OverlayFooterCancelButton,
  OverlayFooterConfirmButton,
  OverlayFooterWrapper,
} from '@/components/shared';

const DialogFooter = ({
  confirmOption,
  cancelOption,
  isPending,
  isLoading,
  possibleConfirm,
}: DialogFooterProps) => {
  return (
    <OverlayFooterWrapper
      className={clsx(DIALOG_FOOTER_DEFAULT_STYLES, 'justify-end gap-x-2')}
    >
      {cancelOption && (
        <OverlayFooterCancelButton
          cancelOption={cancelOption}
          isLoading={isLoading}
          isPending={isPending}
          size={BUTTON_SIZES.LG}
        />
      )}
      <OverlayFooterConfirmButton
        confirmOption={confirmOption}
        isLoading={isLoading}
        possibleConfirm={possibleConfirm && !isPending}
        size={BUTTON_SIZES.LG}
      />
    </OverlayFooterWrapper>
  );
};

export default DialogFooter;
