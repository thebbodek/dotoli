import { useEffect } from 'react';

import { UseInitialSideSheetVisibilityEffectParams } from '@/components/SideSheet/hooks/types';

const useInitialSideSheetVisibilityEffect = ({
  isOpen,
  setIsVisible,
}: UseInitialSideSheetVisibilityEffectParams) => {
  useEffect(() => {
    if (isOpen) setIsVisible(true);
  }, [isOpen]);
};

export default useInitialSideSheetVisibilityEffect;
