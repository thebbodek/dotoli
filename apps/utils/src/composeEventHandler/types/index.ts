export type EventHandler<T> = (event: T, ...args: unknown[]) => void;

export interface ComposeEventHandler<T> {
  internalEventHandler: EventHandler<T>;
  externalEventHandler?: EventHandler<T>;
}
