import { Dispatch, SetStateAction } from 'react';

import { SideSheetProps } from '@/components/SideSheet/types';

export interface UseInitialSideSheetVisibilityEffectParams
  extends Pick<SideSheetProps, 'isOpen'> {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}
