import { FocusEvent } from 'react';

import { INPUT_TYPES } from '@/components/Input/shared/constants';
import { UseNumberInputWheelGuardProps } from '@/components/Input/shared/types';

/* React 는 wheel 을 root 에 passive 로 등록해 onWheel 의 preventDefault 가 무시된다.
 * focus 시점에 element 로 직접 non-passive 리스너를 붙였다가 blur 에서 뗀다. */
const preventWheel = (e: WheelEvent) => e.preventDefault();

const useNumberInputWheelGuard = ({ type }: UseNumberInputWheelGuardProps) => {
  const isGuarded = type === INPUT_TYPES.NUMBER;

  const handleFocus = (e: FocusEvent<HTMLElement>) => {
    if (!isGuarded) return;

    e.currentTarget.addEventListener('wheel', preventWheel, {
      passive: false,
    });
  };

  /* focus 중 type 이 바뀌어도 리스너가 남지 않도록 해제는 가드 없이 항상 실행한다 */
  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    e.currentTarget.removeEventListener('wheel', preventWheel);
  };

  return { handleFocus, handleBlur };
};

export default useNumberInputWheelGuard;
