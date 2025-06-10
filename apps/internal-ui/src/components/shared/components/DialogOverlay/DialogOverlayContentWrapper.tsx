import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { DIALOG_OVERLAY_CONTENT_WRAPPER_ELEMENTS } from '@/components/shared/components/DialogOverlay/constants';
import { DialogOverlayContentWrapperProps } from '@/components/shared/components/DialogOverlay/types';

const DialogOverlayContentWrapper = ({
  as = DIALOG_OVERLAY_CONTENT_WRAPPER_ELEMENTS.DIV,
  className,
  children,
}: PropsWithChildren<DialogOverlayContentWrapperProps>) => {
  const isForm = as === DIALOG_OVERLAY_CONTENT_WRAPPER_ELEMENTS.FORM;

  if (isForm) {
    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        className={clsx(className, 'flex-v-stack')}
      >
        {children}
      </form>
    );
  }

  return <div className={clsx(className)}>{children}</div>;
};

export default DialogOverlayContentWrapper;
