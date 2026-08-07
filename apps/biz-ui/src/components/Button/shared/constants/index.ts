/**
 * @description: 버튼 계열 공통 값만 둡니다. `variant` · `theme` · `size`는 컴포넌트마다
 * 값이 달라 각 컴포넌트 폴더에서 정의합니다 (CLAUDE.md [컴포넌트 API]).
 * */
export const BUTTON_ICON_POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export const BUTTON_PENDING_ICON_KEY = 'circle-notch';

/**
 * @description: 쓰는 쪽에서 `relative`를 함께 겁니다. 적용 대상과 배경은
 * CLAUDE.md [히트 영역 확장]을 따릅니다.
 * */
export const BUTTON_TOUCH_TARGET_STYLE =
  "before:absolute before:-inset-1.5 before:content-['']";
