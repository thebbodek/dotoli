import { MouseEvent } from 'react';

/**
 * @description: 트레일링 버튼의 `mousedown` 기본 동작(포커스 이동)을 막습니다. 막지 않으면
 * 입력이 블러되고, 블러로 상태가 바뀌면서 버튼이 `mouseup` 전에 언마운트돼 `click`이
 * 성립하지 않습니다 (SearchInput의 `typing` → `fill`).
 * */
export const preventInputBlur = (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};
