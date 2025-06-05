import clsx from 'clsx';

import { ConfirmOverlayFooterProps } from '@/components/shared';
import ConfirmOverlayFooter from '@/components/shared/components/ConfirmOverlay/ConfirmOverlayFooter';

const BottomSheetFooter = ({
  className,
  ...rest
}: ConfirmOverlayFooterProps) => {
  return (
    <ConfirmOverlayFooter
      {...rest}
      className={clsx(className, 'px-5 pb-5 pt-3')}
    />
  );
};

export default BottomSheetFooter;
