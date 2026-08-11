import { useEffect } from 'react';

import { UseInitialInputFieldFocusEffectProps } from '@/components/Input/InputField/types';

/**
 * @description: `autoFocus`나 소비처의 `ref.focus()`로 마운트 시점에 이미 포커스가 잡혀
 * 있으면 focus 이벤트가 오지 않아 `isFocused`가 false로 남습니다. 그러면 접힌 라벨이
 * 안내문구를 덮으므로 DOM을 원본으로 한 번 맞춥니다.
 *
 * 초기값을 `autoFocus`로 세워 두고 여기서 보정만 하는 구조입니다 — 초기값만 쓰면
 * 포커스를 다른 요소에 뺏긴 경우를 못 잡고, 이 훅만 쓰면 첫 페인트가 한 프레임 어긋납니다.
 * */
const useInitialInputFieldFocusEffect = ({
  fieldId,
  setIsFocused,
}: UseInitialInputFieldFocusEffectProps) => {
  useEffect(() => {
    setIsFocused(document.activeElement?.id === fieldId);
  }, [fieldId, setIsFocused]);
};

export default useInitialInputFieldFocusEffect;
