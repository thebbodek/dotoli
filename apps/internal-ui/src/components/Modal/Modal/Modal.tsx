import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import ModalDescription from '@/components/Modal/Modal/ModalDescription';
import ModalTitle from '@/components/Modal/Modal/ModalTitle';
import { ModalProps } from '@/components/Modal/Modal/types';
import { MODAL_VARIANTS, ModalBase } from '@/components/Modal/ModalBase';
import ModalButtons from '@/components/Modal/Modal/ModalButtons';

const Modal = ({
  isOpen,
  ref,
  children,
  className,
}: PropsWithChildren<ModalProps>) => {
  return (
    <ModalBase ref={ref} variant={MODAL_VARIANTS.MODAL} isOpen={isOpen} dimmed>
      <div
        className={clsx(
          className,
          'flex-v-stack rounded-16 shadow-24 gap-y-6 bg-white px-[1.875rem] pb-6',
        )}
      >
        {children}
      </div>
    </ModalBase>
  );
};

export default Modal;

Modal.displayName = 'Modal';
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Buttons = ModalButtons;
