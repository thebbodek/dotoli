import { ACCEPT_FILES } from '@/shared/constants/ext';
import { ExtFnProps } from '@/shared/types/Ext';

export const extractExt = ({ accept = ACCEPT_FILES, str }: ExtFnProps) =>
  accept.reduce(
    (acc, ext) => (str.toLowerCase().endsWith(ext) ? ext : acc),
    '',
  );
