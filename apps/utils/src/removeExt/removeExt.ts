import { ACCEPT_FILES, ExtFnParams } from '@/shared';

export const removeExt = ({ accept = ACCEPT_FILES, str }: ExtFnParams) =>
  accept.reduce(
    (acc, ext) => (acc.endsWith(ext) ? acc.replace(ext, '') : acc),
    str.toLowerCase(),
  );
