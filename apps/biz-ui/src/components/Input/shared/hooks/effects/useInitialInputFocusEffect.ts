import { useEffect } from 'react';

import { UseInitialInputFocusEffectProps } from '@/components/Input/shared/types';

export const useInitialInputFocusEffect = ({
  fieldId,
  setIsFocused,
}: UseInitialInputFocusEffectProps) => {
  useEffect(() => {
    setIsFocused(document.activeElement?.id === fieldId);
  }, [fieldId, setIsFocused]);
};
