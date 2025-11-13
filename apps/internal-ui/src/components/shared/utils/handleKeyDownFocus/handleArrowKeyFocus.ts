import { HANDLE_KEY_DOWN_FOCUS_KEYS } from '@/components/shared/utils/handleKeyDownFocus/constants';
import {
  GetDirectionProps,
  HandleKeyDownFocusProps,
} from '@/components/shared/utils/handleKeyDownFocus/types';

const getTargetIndex = ({
  currentFocusIndex,
  eventKey,
  length,
}: GetDirectionProps) => {
  const calculateTargetIndex = (direction: number) =>
    (currentFocusIndex + direction + length) % length;

  switch (eventKey) {
    case 'ArrowRight':
      return calculateTargetIndex(1);
    case 'ArrowDown':
      return calculateTargetIndex(1);
    case 'ArrowLeft':
      return calculateTargetIndex(-1);
    case 'ArrowUp':
      return calculateTargetIndex(-1);
    case 'Home':
      return 0;
    case 'End':
      return length - 1;
    default:
      return currentFocusIndex;
  }
};

export const handleKeyDownFocus = <
  T extends HTMLElement,
  P extends HTMLElement,
>({
  e,
  refs,
}: HandleKeyDownFocusProps<T, P>) => {
  if (!HANDLE_KEY_DOWN_FOCUS_KEYS.includes(e.key)) return;

  e.preventDefault();

  const { current: tabs } = refs;
  const enabledTabKeys = Object.keys(tabs).filter(
    (key) => tabs[key] && 'disabled' in tabs[key] && !tabs[key].disabled,
  );
  const currentFocusIndex = enabledTabKeys.findIndex(
    (key) => document.activeElement === tabs[key],
  );

  const targetIndex = getTargetIndex({
    currentFocusIndex,
    eventKey: e.key,
    length: enabledTabKeys.length,
  });
  const [targetKey] = enabledTabKeys[targetIndex];
  const targetEl = tabs[targetKey];

  if (targetEl) targetEl.focus();
};
