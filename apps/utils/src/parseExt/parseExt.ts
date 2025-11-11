import { extractExt } from '@/extractExt';
import { removeExt } from '@/removeExt';
import { ACCEPT_FILES, ExtFnParams } from '@/shared';

export const parseExt = ({ accept = ACCEPT_FILES, str }: ExtFnParams) => {
  const initialValue = {
    removedExt: '',
    ext: '',
  };

  if (!str) return initialValue;

  return accept.reduce((acc, ext) => {
    if (str.toLowerCase().endsWith(ext)) {
      return {
        removedExt: removeExt({ str }),
        ext: extractExt({ str }),
      };
    }

    return acc;
  }, initialValue);
};
