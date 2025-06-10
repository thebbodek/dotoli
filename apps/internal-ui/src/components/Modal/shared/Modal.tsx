import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import ModalFooter from '@/components/Modal/shared/ModalFooter';
import {
  Overlay,
  OVERLAY_VARIANTS,
  OverlayBasePrimitiveProps,
} from '@/components/shared';

const Modal = ({
  isOpen,
  ref,
  children,
  className,
}: PropsWithChildren<OverlayBasePrimitiveProps>) => {
  return (
    <Overlay ref={ref} variant={OVERLAY_VARIANTS.MODAL} isOpen={isOpen} dimmed>
      <div
        className={clsx(
          className,
          'rounded-16 shadow-24 animate-popup bg-white px-[1.875rem] pb-6',
        )}
      >
        {children}
      </div>
    </Overlay>
  );
};

export default Modal;

Modal.displayName = 'Modal';
Modal.Footer = ModalFooter;
