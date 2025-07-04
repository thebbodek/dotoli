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
  [RADIUS_VARIANTS.RADIUS_4]: 'rounded-in-4',
  [RADIUS_VARIANTS.RADIUS_6]: 'rounded-in-6',
  [RADIUS_VARIANTS.RADIUS_8]: 'rounded-in-8',
  [RADIUS_VARIANTS.RADIUS_12]: 'rounded-in-12',
  [RADIUS_VARIANTS.RADIUS_16]: 'rounded-in-16',
  [RADIUS_VARIANTS.RADIUS_24]: 'rounded-in-24',
  [RADIUS_VARIANTS.RADIUS_FULL]: 'rounded-in-full',
} as const;
