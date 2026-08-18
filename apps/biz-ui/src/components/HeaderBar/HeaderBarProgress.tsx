import {
  HEADER_BAR_PROGRESS_MIN_STEP,
  HEADER_BAR_PROGRESS_TRACK_STYLE,
  HEADER_BAR_PROGRESS_VALUE_STYLE,
} from '@/components/HeaderBar/constants';
import { HeaderBarProgressOption } from '@/components/HeaderBar/types';
import { calculateHeaderBarProgressRate } from '@/components/HeaderBar/utils';

const HeaderBarProgress = ({
  currentStep,
  totalSteps,
}: HeaderBarProgressOption) => {
  const rate = calculateHeaderBarProgressRate({ currentStep, totalSteps });

  return (
    <div
      aria-valuemax={totalSteps}
      aria-valuemin={HEADER_BAR_PROGRESS_MIN_STEP}
      aria-valuenow={currentStep}
      className={HEADER_BAR_PROGRESS_TRACK_STYLE}
      role='progressbar'
    >
      <div
        className={HEADER_BAR_PROGRESS_VALUE_STYLE}
        style={{ width: `${rate}%` }}
      />
    </div>
  );
};

export default HeaderBarProgress;
