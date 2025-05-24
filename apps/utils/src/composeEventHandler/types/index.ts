export type EventHandler<T> = (event: T, ...args: any[]) => void;

export interface ComposeEventHandler<T> {
  internalEventHandler: EventHandler<T>;
  externalEventHandler?: EventHandler<T>;
}
