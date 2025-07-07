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

  const { current: items } = refs;
  const enabledItems = Object.entries(items).filter(
    ([_, el]) => el && 'disabled' in el && !el.disabled,
  );
  const currentFocusIndex = enabledItems.findIndex(
    ([value]) => document.activeElement === items[value],
  );

  const { length } = enabledItems;
  const targetIndex = getTargetIndex({
    currentFocusIndex,
    eventKey: e.key,
    length,
  });
  const [targetValue] = enabledItems[targetIndex];
  const targetEl = refs.current[targetValue];

  if (targetEl) targetEl.focus();
};
