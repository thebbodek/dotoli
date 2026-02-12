import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { IconButton } from '@/components/Button';
import { Portal } from '@/components/Portal';
import { OverlayTitle } from '@/components/shared';
import OverlayLoading from '@/components/shared/components/Overlay/OverlayLoading';
import { SIDE_SHEET_DEFAULT_CONTAINER_ID } from '@/components/SideSheet/constants';
import useSideSheetContainerEffect from '@/components/SideSheet/hooks/effects/useSideSheetContainerEffect';
import useSideSheetAnimation from '@/components/SideSheet/hooks/useSideSheetAnimation';
import { SideSheetProps } from '@/components/SideSheet/types';

const SideSheet = ({
  isOpen,
  containerId = SIDE_SHEET_DEFAULT_CONTAINER_ID,
  title,
  isLoading = false,
  onClose,
  className,
  children,
}: PropsWithChildren<SideSheetProps>) => {
  const { isVisible, onAnimationEnd } = useSideSheetAnimation({ isOpen });

  useSideSheetContainerEffect({ containerId });

  return (
    <Portal target={containerId}>
      <dialog
        className={clsx(
          'absolute top-0 right-0 z-1000 h-full w-full bg-transparent p-3 pl-0 open:flex open:justify-end',
          isVisible &&
            (isOpen ? 'animate-in-side-sheet-in' : 'animate-in-side-sheet-out'),
        )}
        open={isVisible}
        onClick={(e) => {
          if (e.currentTarget !== e.target) return;

          onClose();
        }}
        onAnimationEnd={onAnimationEnd}
      >
        <div className='bg-in-white rounded-in-12 shadow-in-20 in-flex-v-stack h-full w-95'>
          <header
            className={clsx(
              'flex shrink-0 px-6 py-2.5',
              title ? 'items-center justify-between' : 'justify-end',
            )}
          >
            {title && <OverlayTitle title={title} variant='body-16-b' />}
            <IconButton aria-label='닫기' iconKey='x' onClick={onClose} />
          </header>
          <div
            className={clsx(
              className,
              'flex-1 shrink grow',
              isLoading
                ? 'relative overflow-hidden'
                : 'overflow-y-auto overscroll-none',
            )}
          >
            {children}
            {isLoading && <OverlayLoading />}
          </div>
        </div>
      </dialog>
    </Portal>
  );
};

export default SideSheet;
