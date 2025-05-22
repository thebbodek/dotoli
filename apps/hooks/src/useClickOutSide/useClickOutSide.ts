import { useRef } from 'react';

import { UseClickOutsideProps } from '@/useClickOutSide/types';
import useClickOutSideEffect from '@/useClickOutSide/useClickOutSideEffect';

const useClickOutside = <T extends HTMLElement>({
  onClose,
  useClickOutsideEvent,
}: UseClickOutsideProps) => {
  const contentRef = useRef<T>(null);

  useClickOutSideEffect({
    ref: contentRef,
    onClose,
    useClickOutsideEvent,
  });

  return { contentRef };
};

export default useClickOutside;
