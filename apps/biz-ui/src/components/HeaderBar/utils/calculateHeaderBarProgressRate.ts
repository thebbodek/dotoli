import { clamp } from 'es-toolkit';

import {
  HEADER_BAR_PROGRESS_MAX_RATE,
  HEADER_BAR_PROGRESS_MIN_RATE,
  HEADER_BAR_PROGRESS_MIN_STEP,
} from '@/components/HeaderBar/constants';
import { HeaderBarProgressOption } from '@/components/HeaderBar/types';

export const calculateHeaderBarProgressRate = ({
  currentStep,
  totalSteps,
}: HeaderBarProgressOption) => {
  if (totalSteps <= HEADER_BAR_PROGRESS_MIN_STEP) {
    return HEADER_BAR_PROGRESS_MIN_RATE;
  }

  return clamp(
    (currentStep / totalSteps) * HEADER_BAR_PROGRESS_MAX_RATE,
    HEADER_BAR_PROGRESS_MIN_RATE,
    HEADER_BAR_PROGRESS_MAX_RATE,
  );
};
