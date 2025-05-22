import { POPOVER_PLACEMENTS } from '@/components/Popover/Popover/constants';
import {
  GetPopoverPositionProps,
  PopoverPlacement,
  PopoverStyle,
} from '@/components/Popover/Popover/types';

// if (placement.startsWith('bottom') && b.bottom > r.bottom) {
//   onFlipPlacement(placement.replace('bottom', 'top'));
// } else if (placement.startsWith('top') && b.top < r.top) {
//   onFlipPlacement(placement.replace('top', 'bottom'));
// }

export const getPopoverPosition = ({
  trigger,
  popover,
  root,
  offset = 0,
  applyMaxWidth = false,
  placement = POPOVER_PLACEMENTS.BOTTOM_RIGHT,
}: GetPopoverPositionProps) => {
  const {
    left: triggerLeft,
    bottom: triggerBottom,
    right: triggerRight,
    top: triggerTop,
    width: triggerWidth,
    height: triggerHeight,
  } = trigger.getBoundingClientRect();

  const { width: popoverWidth, height: popoverHeight } =
    popover.getBoundingClientRect();
  console.log('popoverHeight', popoverHeight);
  console.log('triggerTop - offset - triggerHeight', triggerTop);
  console.log('triggerTop - offset - triggerHeight', offset);
  console.log('triggerTop - offset - triggerHeight', triggerHeight);
  console.log(
    'triggerTop - offset - triggerHeight',
    triggerTop - offset - triggerHeight,
  );
  const style = {
    minWidth: triggerWidth,
    maxWidth: applyMaxWidth ? triggerWidth : 'none',
  } as PopoverStyle;

  const getStyle = ({
    style,
    placement,
  }: {
    style: PopoverStyle;
    placement: PopoverPlacement;
  }) => {
    if (
      placement === POPOVER_PLACEMENTS.BOTTOM_RIGHT ||
      placement === POPOVER_PLACEMENTS.BOTTOM_LEFT
    ) {
      const _style = {
        top: triggerBottom + offset,
        bottom: triggerBottom + offset + popoverHeight,
      } as PopoverStyle;

      if (placement === POPOVER_PLACEMENTS.BOTTOM_RIGHT) {
        _style['left'] = triggerLeft;
        _style['right'] = undefined;
      }

      if (placement === POPOVER_PLACEMENTS.BOTTOM_LEFT) {
        _style['left'] = undefined;
        _style['right'] = triggerRight - triggerWidth;
      }

      Object.assign(style, _style);
    }

    if (
      placement === POPOVER_PLACEMENTS.TOP_RIGHT ||
      placement === POPOVER_PLACEMENTS.TOP_LEFT
    ) {
      const _style = {
        bottom: triggerTop + offset + triggerHeight,
        top: undefined,
      } as PopoverStyle;

      if (placement === POPOVER_PLACEMENTS.TOP_RIGHT) {
        _style['left'] = triggerLeft;
        _style['right'] = undefined;
      }

      if (placement === POPOVER_PLACEMENTS.TOP_LEFT) {
        _style['left'] = undefined;
        _style['right'] = triggerRight - triggerWidth;
      }

      Object.assign(style, _style);
    }

    return style;
  };
  const { top, bottom, left, right } = getStyle({ style, placement });

  return getStyle({ style, placement });
};
