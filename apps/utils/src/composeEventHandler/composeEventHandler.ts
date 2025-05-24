import { ComposeEventHandler, EventHandler } from '@/composeEventHandler/types';

export const composeEventHandler =
  <T>({
    internalEventHandler,
    externalEventHandler,
  }: ComposeEventHandler<T>): EventHandler<T> =>
  (e, ...args) => {
    (e as Event).stopPropagation();

    internalEventHandler(e, ...args);

    if (externalEventHandler) {
      externalEventHandler(e, ...args);
    }
  };
