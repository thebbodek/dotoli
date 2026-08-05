import { IconStyle } from '@phosphor-icons/core';

/**
 * @description: Figma 아이콘 세트가 정의한 웨이트만 노출합니다 (Regular · Bold · Fill).
 * `globals.css`도 이 3종의 웹폰트만 import 하므로 나머지를 넘기면 아이콘이 렌더되지 않습니다.
 * */
export const ICON_WEIGHTS = {
  REGULAR: IconStyle.REGULAR,
  BOLD: IconStyle.BOLD,
  FILL: IconStyle.FILL,
} as const;

export const ICON_DEFAULT_WEIGHT = ICON_WEIGHTS.BOLD;

export const ICON_CLASS_PREFIX = 'ph';
