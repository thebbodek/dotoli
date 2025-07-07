import { KeyboardEvent, RefObject } from 'react';

export type KeydownFocusControlItemRefs<T extends HTMLElement> = RefObject<
  Record<string, T | null>
>;

export interface HandleKeyDownFocusProps<
  T extends HTMLElement,
  P extends HTMLElement,
> {
  e: KeyboardEvent<T>;
  refs: KeydownFocusControlItemRefs<P>;
}

export interface GetDirectionProps {
  eventKey: KeyboardEvent['key'];
  length: number;
  currentFocusIndex: number;
}
