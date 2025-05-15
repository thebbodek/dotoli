export const RADIUS_VARIANTS = {
  RADIUS_4: 'radius-4',
  RADIUS_6: 'radius-6',
  RADIUS_8: 'radius-8',
  RADIUS_12: 'radius-12',
  RADIUS_16: 'radius-16',
  RADIUS_24: 'radius-24',
  RADIUS_FULL: 'radius-full',
} as const;

export const RADIUS_STYLES_MAPPER = {
  [RADIUS_VARIANTS.RADIUS_4]: 'rounded-4',
  [RADIUS_VARIANTS.RADIUS_6]: 'rounded-6',
  [RADIUS_VARIANTS.RADIUS_8]: 'rounded-8',
  [RADIUS_VARIANTS.RADIUS_12]: 'rounded-12',
  [RADIUS_VARIANTS.RADIUS_16]: 'rounded-16',
  [RADIUS_VARIANTS.RADIUS_24]: 'rounded-24',
  [RADIUS_VARIANTS.RADIUS_FULL]: 'rounded-full',
} as const;
