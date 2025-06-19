import { useEffect } from 'react';

import { UseTooltipOpenEffectProps } from '@/components/Tooltip/types';

export const useTooltipOpenEffect = ({
  hidden,
  isKeepFloating,
  setIsOpen,
}: UseTooltipOpenEffectProps) => {
  useEffect(() => {
    setIsOpen(!hidden && isKeepFloating);
  }, [hidden, isKeepFloating]);
};
