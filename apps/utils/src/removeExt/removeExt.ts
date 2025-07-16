import { ACCEPT_FILES, ExtFnProps } from '@/shared';

export const removeExt = ({ accept = ACCEPT_FILES, str }: ExtFnProps) =>
  accept.reduce(
    (acc, ext) => (acc.endsWith(ext) ? acc.replace(ext, '') : acc),
    str.toLowerCase(),
  );
