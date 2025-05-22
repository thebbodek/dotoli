import { POPOVER_PLACEMENTS } from '@/components/Popover/Popover/constants';
import {
  GetPopoverPositionProps,
  PopoverPlacement,
  PopoverStyle,
} from '@/components/Popover/Popover/types';

export const getPopoverPosition = ({
  root,
  trigger,
  popover,
  offset = 0,
  applyMaxWidth = false,
  placement = POPOVER_PLACEMENTS.BOTTOM_RIGHT,
  threshold = 2,
}: GetPopoverPositionProps) => {
  const {
    left: triggerLeft,
    bottom: triggerBottom,
    right: triggerRight,
    top: triggerTop,
    width: triggerWidth,
  } = trigger.getBoundingClientRect();
  const { width: popoverWidth, height: popoverHeight } =
    popover.getBoundingClientRect();
  const { width: rootWidth, height: rootHeight } =
    document.body.getBoundingClientRect();

  const getPlacement = () => {
    const overflowRoot = root ?? document.body;
    const {
      right: overflowRight,
      bottom: overflowBottom,
      left: overflowLeft,
      top: overflowTop,
    } = overflowRoot.getBoundingClientRect();

    if (placement === POPOVER_PLACEMENTS.BOTTOM_RIGHT) {
      const isOverflowRight =
        triggerLeft + popoverWidth > (overflowRight as number) - threshold;
      const isOverflowBottom =
        triggerBottom + popoverHeight + offset >
        (overflowBottom as number) - threshold;

      if (isOverflowRight && isOverflowBottom) {
        return POPOVER_PLACEMENTS.TOP_LEFT;
      }

      if (isOverflowRight && !isOverflowBottom) {
        return POPOVER_PLACEMENTS.BOTTOM_LEFT;
      }

      if (!isOverflowRight && isOverflowBottom) {
        return POPOVER_PLACEMENTS.TOP_RIGHT;
      }

      return placement;
    }

    if (placement === POPOVER_PLACEMENTS.BOTTOM_LEFT) {
      const isOverflowLeft =
        triggerRight - popoverWidth < (overflowLeft as number) + threshold;
      const isOverflowBottom =
        triggerBottom + popoverHeight + offset >
        (overflowBottom as number) - threshold;

      if (isOverflowLeft && isOverflowBottom) {
        return POPOVER_PLACEMENTS.TOP_RIGHT;
      }

      if (isOverflowLeft && !isOverflowBottom) {
        return POPOVER_PLACEMENTS.BOTTOM_RIGHT;
      }

      if (!isOverflowLeft && isOverflowBottom) {
        return POPOVER_PLACEMENTS.TOP_LEFT;
      }

      return placement;
    }

    if (placement === POPOVER_PLACEMENTS.TOP_RIGHT) {
      const isOverflowRight =
        triggerLeft + popoverWidth > (overflowRight as number) - threshold;
      const isOverflowTop =
        triggerTop - offset - popoverHeight <
        (overflowTop as number) + threshold;

      if (isOverflowRight && isOverflowTop) {
        return POPOVER_PLACEMENTS.BOTTOM_LEFT;
      }

      if (isOverflowRight && !isOverflowTop) {
        return POPOVER_PLACEMENTS.TOP_LEFT;
      }

      if (!isOverflowRight && isOverflowTop) {
        return POPOVER_PLACEMENTS.BOTTOM_RIGHT;
      }

      return placement;
    }

    if (placement === POPOVER_PLACEMENTS.TOP_LEFT) {
      const isOverflowLeft =
        triggerRight - popoverWidth < (overflowLeft as number) + threshold;
      const isOverflowTop =
        triggerTop - offset - popoverHeight <
        (overflowTop as number) + threshold;

      if (isOverflowLeft && isOverflowTop) {
        return POPOVER_PLACEMENTS.BOTTOM_RIGHT;
      }

      if (isOverflowLeft && !isOverflowTop) {
        return POPOVER_PLACEMENTS.TOP_RIGHT;
      }

      if (!isOverflowLeft && isOverflowTop) {
        return POPOVER_PLACEMENTS.BOTTOM_LEFT;
      }

      return placement;
    }

    return placement;
  };

  const getStyle = ({
    placement,
  }: {
    placement: PopoverPlacement;
  }): PopoverStyle => {
    let style = {
      minWidth: triggerWidth,
      maxWidth: applyMaxWidth ? triggerWidth : 'none',
    } as PopoverStyle;

    if (
      placement === POPOVER_PLACEMENTS.BOTTOM_RIGHT ||
      placement === POPOVER_PLACEMENTS.BOTTOM_LEFT
    ) {
      const _style = {
        top: triggerBottom + offset,
        bottom: undefined,
      } as PopoverStyle;

      if (placement === POPOVER_PLACEMENTS.BOTTOM_RIGHT) {
        _style['left'] = triggerLeft;
        _style['right'] = undefined;
      }

      if (placement === POPOVER_PLACEMENTS.BOTTOM_LEFT) {
        _style['left'] = undefined;
        _style['right'] = rootWidth - triggerRight;
      }

      return Object.assign(style, _style);
    }

    if (
      placement === POPOVER_PLACEMENTS.TOP_RIGHT ||
      placement === POPOVER_PLACEMENTS.TOP_LEFT
    ) {
      const _style = {
        top: undefined,
        bottom: rootHeight - triggerTop + offset,
      } as PopoverStyle;

      if (placement === POPOVER_PLACEMENTS.TOP_RIGHT) {
        _style['left'] = triggerLeft;
        _style['right'] = undefined;
      }

      if (placement === POPOVER_PLACEMENTS.TOP_LEFT) {
        _style['left'] = undefined;
        _style['right'] = rootWidth - triggerRight;
      }

      return Object.assign(style, _style);
    }

    return style;
  };

  return getStyle({ placement: getPlacement() });
};
