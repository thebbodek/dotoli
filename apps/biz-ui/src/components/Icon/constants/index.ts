import { IconStyle } from '@phosphor-icons/core';

export const ICON_WEIGHTS = {
  REGULAR: IconStyle.REGULAR,
  BOLD: IconStyle.BOLD,
  FILL: IconStyle.FILL,
} as const;

export const ICON_DEFAULT_WEIGHT = ICON_WEIGHTS.BOLD;

export const ICON_CLASS_PREFIX = 'ph';
