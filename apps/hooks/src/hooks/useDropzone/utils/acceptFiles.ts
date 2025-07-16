import { ACCEPT_FILES } from '@bbodek/utils';

import { UseDropzoneInput } from '@/hooks/useDropzone/types';

export const parseAcceptAttr = ({
  accept = ACCEPT_FILES,
}: Pick<UseDropzoneInput, 'accept'>) => accept.join(',');

export const parseAcceptFilesToString = (params?: {
  accept: UseDropzoneInput['accept'];
}) => {
  const { accept = ACCEPT_FILES } = params ?? {};

  return accept.map((ext) => `*${ext}`).join(', ');
};
