import {
  POPOVER_PLACEMENT_POSITION_FLIPS,
  POPOVER_PLACEMENTS,
  POPOVER_POSITION_DIVISION,
  POPOVER_POSITIONS,
} from '@/components/Popover/Popover/constants';
import {
  GetPopoverPositionProps,
  PopoverPlacementPosition,
  PopoverStyle,
} from '@/components/Popover/Popover/types';

export const getPopoverPosition = ({
  root,
  trigger,
  popover,
  offset = 0,
  applyMaxWidth = false,
  placement = POPOVER_PLACEMENTS.BOTTOM_RIGHT,
  threshold = 0,
}: GetPopoverPositionProps) => {
  const triggerRect = trigger.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const rootRect = document.body.getBoundingClientRect();
  const overflowRect = root?.getBoundingClientRect() ?? rootRect;

  const {
    left: triggerLeft,
    bottom: triggerBottom,
    right: triggerRight,
    top: triggerTop,
    width: triggerWidth,
  } = triggerRect;
  const { width: popoverWidth, height: popoverHeight } = popoverRect;
  const { width: rootWidth, height: rootHeight } = rootRect;
  const {
    right: overflowRight,
    bottom: overflowBottom,
    left: overflowLeft,
    top: overflowTop,
  } = overflowRect;

  const VERTICAL_METRICS = {
    OVERFLOW_BOTTOM_EDGE: overflowBottom - threshold,
    OVERFLOW_TOP_EDGE: overflowTop + threshold,
    POPOVER_BOTTOM_EDGE: triggerBottom + popoverHeight + offset,
    POPOVER_TOP_EDGE: triggerTop - offset - popoverHeight,
  } as const;
  const HORIZONTAL_METRICS = {
    OVERFLOW_LEFT_EDGE: overflowRight - threshold,
    OVERFLOW_RIGHT_EDGE: overflowLeft + threshold,
    POPOVER_LEFT_EDGE: triggerLeft + popoverWidth,
    POPOVER_RIGHT_EDGE: triggerRight - popoverWidth,
  } as const;
  const POPOVER_POSITION_OVERFLOWS = {
    [POPOVER_POSITIONS.BOTTOM]: {
      flag:
        VERTICAL_METRICS.POPOVER_BOTTOM_EDGE >
        VERTICAL_METRICS.OVERFLOW_BOTTOM_EDGE,
      flippedPosition:
        POPOVER_PLACEMENT_POSITION_FLIPS[POPOVER_POSITIONS.BOTTOM],
    },
    [POPOVER_POSITIONS.TOP]: {
      flag:
        VERTICAL_METRICS.POPOVER_TOP_EDGE < VERTICAL_METRICS.OVERFLOW_TOP_EDGE,
      flippedPosition: POPOVER_PLACEMENT_POSITION_FLIPS[POPOVER_POSITIONS.TOP],
    },
    [POPOVER_POSITIONS.LEFT]: {
      flag:
        HORIZONTAL_METRICS.POPOVER_LEFT_EDGE >
        HORIZONTAL_METRICS.OVERFLOW_LEFT_EDGE,
      flippedPosition: POPOVER_PLACEMENT_POSITION_FLIPS[POPOVER_POSITIONS.LEFT],
    },
    [POPOVER_POSITIONS.RIGHT]: {
      flag:
        HORIZONTAL_METRICS.POPOVER_RIGHT_EDGE <
        HORIZONTAL_METRICS.OVERFLOW_RIGHT_EDGE,
      flippedPosition:
        POPOVER_PLACEMENT_POSITION_FLIPS[POPOVER_POSITIONS.RIGHT],
    },
  } as const;

  const [verticalPosition, horizontalPosition] = placement
    .split(POPOVER_POSITION_DIVISION)
    .map((position) => {
      const _position = position as PopoverPlacementPosition;
      const { flag, flippedPosition } = POPOVER_POSITION_OVERFLOWS[_position];

      return !flag ? _position : flippedPosition;
    });

  const style = {
    minWidth: triggerWidth,
    maxWidth: applyMaxWidth ? triggerWidth : 'none',
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
  } as PopoverStyle;

  if (verticalPosition === POPOVER_POSITIONS.BOTTOM) {
    style.top = triggerBottom + offset;
  }

  if (verticalPosition === POPOVER_POSITIONS.TOP) {
    style.bottom = rootHeight - triggerTop + offset;
  }

  if (horizontalPosition === POPOVER_POSITIONS.LEFT) {
    style.left = triggerLeft;
  }

  if (horizontalPosition === POPOVER_POSITIONS.RIGHT) {
    style.right = rootWidth - triggerRight;
  }

  return style;
};
