import { RefObject } from 'react';

export interface UseClickOutsideProps {
  onClose: (e: MouseEvent) => void;
  useClickOutsideEvent?: boolean;
}

export interface UseClickOutSideEffectProps<T extends HTMLElement>
  extends UseClickOutsideProps {
  ref: RefObject<T | null>;
}
