import { useState } from 'react';

import useInitialSideSheetVisibilityEffect from '@/components/SideSheet/hooks/effects/useInitialSideSheetVisibilityEffect';
import { SideSheetProps } from '@/components/SideSheet/types';

const useSideSheetAnimation = ({ isOpen }: Pick<SideSheetProps, 'isOpen'>) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  const onAnimationEnd = () => {
    if (!isOpen) setIsVisible(false);
  };

  useInitialSideSheetVisibilityEffect({ isOpen, setIsVisible });

  return { isVisible, onAnimationEnd };
};

export default useSideSheetAnimation;
