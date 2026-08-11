import { ResolveInputFieldStateProps } from '@/components/Input/InputField/types';
import { INPUT_STATES } from '@/components/Input/shared/constants';

/**
 * @description: Figma의 state 축을 prop으로 열지 않고 `disabled`(HTML 속성)와
 * `errorMessage` 유무에서 파생시킵니다. 나머지 두 축(포커스 · 값 유무)은 라벨 위치만
 * 바꾸므로 여기 들어오지 않습니다.
 * */
export const resolveInputFieldState = ({
  disabled,
  errorMessage,
}: ResolveInputFieldStateProps) => {
  if (disabled) return INPUT_STATES.DISABLED;

  if (errorMessage) return INPUT_STATES.ERROR;

  return INPUT_STATES.DEFAULT;
};
