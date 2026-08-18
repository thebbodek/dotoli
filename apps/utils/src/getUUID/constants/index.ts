export const UUID_BYTE_LENGTH = 16;

export const UUID_VERSION_BYTE_INDEX = 6;

export const UUID_VARIANT_BYTE_INDEX = 8;

export const UUID_VERSION_MASK = 0x0f;

export const UUID_VERSION_4 = 0x40;

export const UUID_VARIANT_MASK = 0x3f;

export const UUID_VARIANT_RFC4122 = 0x80;

export const HEX_RADIX = 16;

export const HEX_DIGITS_PER_BYTE = 2;

export const UUID_SECTION_OFFSETS = [
  [0, 8],
  [8, 12],
  [12, 16],
  [16, 20],
  [20, 32],
] as const;
