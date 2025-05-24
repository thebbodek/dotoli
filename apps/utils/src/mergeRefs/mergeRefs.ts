import { Ref, RefCallback, RefObject } from 'react';

export const mergeRefs = <T>(...refs: Array<Ref<T> | null>): RefCallback<T> => {
  return (element: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        (ref as RefObject<T | null>).current = element;
      }
    });
  };
};
