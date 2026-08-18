import {
  HEX_DIGITS_PER_BYTE,
  HEX_RADIX,
  UUID_BYTE_LENGTH,
  UUID_SECTION_OFFSETS,
  UUID_VARIANT_BYTE_INDEX,
  UUID_VARIANT_MASK,
  UUID_VARIANT_RFC4122,
  UUID_VERSION_4,
  UUID_VERSION_BYTE_INDEX,
  UUID_VERSION_MASK,
} from './constants';
import { UUID } from './types';

export const getUUID = (): UUID => {
  if (typeof self.crypto.randomUUID === 'function') {
    return self.crypto.randomUUID();
  }

  const bytes = self.crypto.getRandomValues(new Uint8Array(UUID_BYTE_LENGTH));

  bytes[UUID_VERSION_BYTE_INDEX] =
    (bytes[UUID_VERSION_BYTE_INDEX] & UUID_VERSION_MASK) | UUID_VERSION_4;
  bytes[UUID_VARIANT_BYTE_INDEX] =
    (bytes[UUID_VARIANT_BYTE_INDEX] & UUID_VARIANT_MASK) | UUID_VARIANT_RFC4122;

  const hex = Array.from(bytes, (byte) =>
    byte.toString(HEX_RADIX).padStart(HEX_DIGITS_PER_BYTE, '0'),
  ).join('');

  return UUID_SECTION_OFFSETS.map(([start, end]) => hex.slice(start, end)).join(
    '-',
  ) as UUID;
};
