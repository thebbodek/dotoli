import { Dispatch, SetStateAction } from 'react';

import { RESPONSIBLE_STATUS } from '@/hooks/useResponsible/constants';

export type ResponsibleStatus =
  (typeof RESPONSIBLE_STATUS)[keyof typeof RESPONSIBLE_STATUS];

export interface UseResponsibleStatusEffectParams {
  setStatus: Dispatch<SetStateAction<ResponsibleStatus | null>>;
}
