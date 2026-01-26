import { PreviewOptions } from '@/components/Preview/shared/components/Preview/hooks';

export const PREVIEW_FILE_NAME_FALLBACK = '(알 수 없음)';

export const PREVIEW_ACCEPT_IMAGE_FILE_EXT = {
  PNG: 'png',
  JPEG: 'jpeg',
  HEIC: 'heic',
  WEBP: 'webp',
  JPG: 'jpg',
} as const;

export const PREVIEW_ACCEPT_FILE_EXT = {
  ...PREVIEW_ACCEPT_IMAGE_FILE_EXT,
  PDF: 'pdf',
} as const;

export const PREVIEW_TRANSFORM_TYPE = {
  SCALE: 'SCALE',
  ROTATE: 'ROTATE',
} as const;

export const PREVIEW_FIT_MODE = {
  WIDTH: 'width',
  HEIGHT: 'height',
} as const;

export const PREVIEW_TRANSFORM_VALUES = {
  [PREVIEW_TRANSFORM_TYPE.SCALE]: {
    MIN: 0.25,
    '0_5': 0.5,
    '0_75': 0.75,
    '1_25': 1.25,
    '1_5': 1.5,
    '1_75': 1.75,
    '2': 2,
    '2_25': 2.25,
    '2_5': 2.5,
    '2_75': 2.75,
    MAX: 3,
    FIT: 1,
  },
  [PREVIEW_TRANSFORM_TYPE.ROTATE]: {
    MIN: 0,
    '-90': -90,
    '-180': -180,
    MAX: -270,
  },
} as const;

export const PREVIEW_VIEWER_STYLES = {
  [PREVIEW_TRANSFORM_TYPE.SCALE]: {
    [PREVIEW_TRANSFORM_VALUES.SCALE.MIN]: 'scale-[25%]',
    [PREVIEW_TRANSFORM_VALUES.SCALE['0_5']]: 'scale-[50%]',
    [PREVIEW_TRANSFORM_VALUES.SCALE['0_75']]: 'scale-[75%]',
    [PREVIEW_TRANSFORM_VALUES.SCALE['1_25']]: 'scale-[125%]',
    [PREVIEW_TRANSFORM_VALUES.SCALE.FIT]: 'scale-[100%]',
    [PREVIEW_TRANSFORM_VALUES.SCALE['1_5']]: 'scale-[150%]',
    [PREVIEW_TRANSFORM_VALUES.SCALE['1_75']]: 'scale-[175%]',
    [PREVIEW_TRANSFORM_VALUES.SCALE['2']]: 'scale-[200%]',
    [PREVIEW_TRANSFORM_VALUES.SCALE['2_25']]: 'scale-[225%]',
    [PREVIEW_TRANSFORM_VALUES.SCALE['2_5']]: 'scale-[250%]',
    [PREVIEW_TRANSFORM_VALUES.SCALE['2_75']]: 'scale-[275%]',
    [PREVIEW_TRANSFORM_VALUES.SCALE.MAX]: 'scale-[300%]',
  },
  [PREVIEW_TRANSFORM_TYPE.ROTATE]: {
    [PREVIEW_TRANSFORM_VALUES.ROTATE.MIN]: 'rotate-0',
    [PREVIEW_TRANSFORM_VALUES.ROTATE['-90']]: '-rotate-90',
    [PREVIEW_TRANSFORM_VALUES.ROTATE['-180']]: '-rotate-180',
    [PREVIEW_TRANSFORM_VALUES.ROTATE.MAX]: '-rotate-270',
  },
} as const;

export const PREVIEW_TRANSFORM_INITIAL_VALUES: PreviewOptions = {
  scale: PREVIEW_TRANSFORM_VALUES.SCALE.FIT,
  rotate: PREVIEW_TRANSFORM_VALUES.ROTATE.MIN,
  fitMode: null,
};

export const PREVIEW_RESPONSE_STYLES = {
  MOBILE: {
    WRAPPER: '',
    CONTAINER: 'in-flex-v-stack h-full',
    HEADER: 'flex-row-reverse justify-end gap-x-2 px-3 py-2.5',
    VIEWER_WRAPPER: 'flex-1',
  },
  DESKTOP: {
    WRAPPER:
      'in-flex-v-stack-center px-[6.25rem] py-[4.375rem] max-w-in-desktop',
    CONTAINER: 'rounded-in-12',
    HEADER: 'justify-between py-2.5 pl-5 pr-3',
    VIEWER_WRAPPER: 'flex-1',
  },
} as const;
