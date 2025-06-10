import { RefObject } from 'react';

export interface ComponentPropsRef<T> {
  ref?: RefObject<T | null>;
}
