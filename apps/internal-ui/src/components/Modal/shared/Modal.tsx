import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import ModalDescription from '@/components/Modal/shared/ModalDescription';
import ModalFooter from '@/components/Modal/shared/ModalFooter';
import ModalTitle from '@/components/Modal/shared/ModalTitle';
import { ModalProps } from '@/components/Modal/shared/types';
import { OVERLAY_VARIANTS } from '@/components/shared/constants';
import Overlay from '@/components/shared/Overlay';

const Modal = ({
  isOpen,
  ref,
  children,
  className,
}: PropsWithChildren<ModalProps>) => {
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
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Footer = ModalFooter;
