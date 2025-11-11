import { ACCEPT_FILES } from '@/shared/constants/ext';
import { ExtFnParams } from '@/shared/types/Ext';

export const extractExt = ({ accept = ACCEPT_FILES, str }: ExtFnParams) =>
  accept.reduce(
    (acc, ext) => (str.toLowerCase().endsWith(ext) ? ext : acc),
    '',
  );
