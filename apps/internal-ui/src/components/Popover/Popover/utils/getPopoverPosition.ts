import {
  GetPopoverPositionProps,
  PopoverStyle,
} from '@/components/Popover/Popover/types';

export const getPopoverPosition = ({
  trigger,
  popover,
  root,
  offset = 0,
  applyMaxWidth,
}: GetPopoverPositionProps) => {
  const {
    left,
    bottom,
    top,
    width: triggerWidth,
  } = trigger.getBoundingClientRect();
  const style = {
    left,
    top: bottom,
    minWidth: triggerWidth,
    maxWidth: applyMaxWidth ? triggerWidth : 'none',
  } as Partial<PopoverStyle>;
  const { width, height } = popover.getBoundingClientRect();
  const { bottom: rootBottom, right: rootRight } = root.getBoundingClientRect();
  const isOutsideBottom = bottom + height + offset > rootBottom;
  const isOutsideRight = left + width > rootRight;

  if (isOutsideBottom) {
    style['top'] = top - height - offset;
    style['paddingTop'] = 0;
    style['paddingBottom'] = offset;
  }

  if (isOutsideRight) {
    style['left'] = left - (width - triggerWidth);
  }

  return style;
};
