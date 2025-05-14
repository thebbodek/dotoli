import { COLOR_TYPES, COLOR_VARIANTS } from '@/variants/colors/variant';

export type Colors = (typeof COLOR_VARIANTS)[keyof typeof COLOR_VARIANTS];

export type ColorTypes = (typeof COLOR_TYPES)[keyof typeof COLOR_TYPES];
