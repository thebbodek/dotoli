/**
 * @description: 쓰는 쪽에서 `relative`를 함께 겁니다. 적용 대상과 두 값의 선택 기준은
 * CLAUDE.md [히트 영역 확장]을 따릅니다.
 * */
export const TOUCH_TARGET_STYLE =
  "before:absolute before:-inset-1.5 before:content-['']";

export const TOUCH_TARGET_NARROW_STYLE =
  "before:absolute before:-inset-1 before:content-['']";
