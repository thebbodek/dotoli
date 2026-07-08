import { KeyboardEvent, useCallback, useRef } from 'react';

const OPTION_SELECTOR = '[role="option"]';

const useSelectKeyboardNavigation = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 팝오버 콘텐츠 마운트 시 내부에 focus된 요소(검색 input 등)가 없으면 컨테이너에 focus를 줘 방향키 입력을 받는다
  const focusContainerRef = useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node;

    if (node && !node.contains(document.activeElement)) {
      node.focus();
    }
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

    // 한글 IME 조합 중에 focus를 옮기면 조합 문자가 중복 입력되므로 조합이 끝난 뒤에만 이동한다
    if (e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229) return;

    const container = containerRef.current;

    if (!container) return;

    const options = Array.from(
      container.querySelectorAll<HTMLElement>(OPTION_SELECTOR),
    );

    if (options.length === 0) return;

    e.preventDefault();

    const currentIndex = options.indexOf(document.activeElement as HTMLElement);

    if (e.key === 'ArrowDown') {
      const nextIndex =
        currentIndex < 0 ? 0 : Math.min(currentIndex + 1, options.length - 1);

      options[nextIndex].focus();

      return;
    }

    // 첫 아이템에서 위로 이동하면 검색 input으로 복귀
    if (currentIndex === 0) {
      container.querySelector<HTMLElement>('input')?.focus();

      return;
    }

    const prevIndex = currentIndex < 0 ? options.length - 1 : currentIndex - 1;

    options[prevIndex].focus();
  };

  return { focusContainerRef, onKeyDown };
};

export default useSelectKeyboardNavigation;
