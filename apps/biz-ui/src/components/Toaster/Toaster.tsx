import clsx from 'clsx';
import { useSyncExternalStore } from 'react';

import { FeedbackToast } from '@/components/FeedbackToast';
import { Portal } from '@/components/Portal';
import { Toast } from '@/components/Toast';
import {
  TOAST_KINDS,
  TOASTER_BASE_STYLE,
  TOASTER_ITEM_CLOSING_STYLE,
  TOASTER_ITEM_ROLE,
  TOASTER_ITEM_STYLE,
  TOASTER_ROLE,
} from '@/components/Toaster/constants';
import {
  dismissToast,
  getToastServerSnapshot,
  getToastSnapshot,
  subscribeToast,
} from '@/components/Toaster/store';
import { ToasterProps } from '@/components/Toaster/types';
import { resolveToastAction } from '@/components/Toaster/utils';

const Toaster = ({ target, className }: ToasterProps) => {
  const currentToast = useSyncExternalStore(
    subscribeToast,
    getToastSnapshot,
    getToastServerSnapshot,
  );

  return (
    <Portal target={target}>
      <div className={clsx(className, TOASTER_BASE_STYLE)} role={TOASTER_ROLE}>
        {!!currentToast && (
          <div
            className={clsx(
              TOASTER_ITEM_STYLE,
              currentToast.isClosing && TOASTER_ITEM_CLOSING_STYLE,
            )}
            key={currentToast.id}
          >
            {currentToast.kind === TOAST_KINDS.FEEDBACK ? (
              <FeedbackToast
                message={currentToast.message}
                role={TOASTER_ITEM_ROLE}
                type={currentToast.type}
              />
            ) : (
              <Toast
                action={resolveToastAction({
                  action: currentToast.action,
                  onDismiss: () => dismissToast({ id: currentToast.id }),
                })}
                iconKey={currentToast.iconKey}
                message={currentToast.message}
                role={TOASTER_ITEM_ROLE}
                status={currentToast.status}
                weight={currentToast.weight}
                onDismiss={
                  currentToast.useDismiss
                    ? () => dismissToast({ id: currentToast.id })
                    : undefined
                }
              />
            )}
          </div>
        )}
      </div>
    </Portal>
  );
};

export default Toaster;
