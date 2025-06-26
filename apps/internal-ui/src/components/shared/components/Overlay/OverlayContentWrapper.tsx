import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { OVERLAY_CONTENT_WRAPPER_ELEMENTS } from '@/components/shared/components/Overlay/constants';
import OverlayLoading from '@/components/shared/components/Overlay/OverlayLoading';
import { OverlayContentWrapperProps } from '@/components/shared/components/Overlay/types';

const OverlayContentWrapper = ({
  as = OVERLAY_CONTENT_WRAPPER_ELEMENTS.DIV,
  className,
  children,
  isLoading = false,
}: PropsWithChildren<OverlayContentWrapperProps>) => {
  const isForm = as === OVERLAY_CONTENT_WRAPPER_ELEMENTS.FORM;
  const commonClassName = clsx(className, isLoading && 'relative');
  const _children = (
    <>
      {children}
      {isLoading && <OverlayLoading />}
    </>
  );

  if (isForm) {
    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        className={clsx(commonClassName, 'flex-v-stack')}
      >
        {_children}
      </form>
    );
  }

  return <div className={commonClassName}>{_children}</div>;
};

export default OverlayContentWrapper;
