import { extractExt, getUUID } from '@bbodek/utils';

import {
  PREVIEW_FILE_NAME_FALLBACK,
  PreviewFileData,
} from '@/components/Preview/shared';
import { ConvertUrlToFileDataParams } from '@/components/Preview/utils/types';

export const convertUrlToFileData = async ({
  url,
}: ConvertUrlToFileDataParams): Promise<PreviewFileData> => {
  const id = getUUID();
  const [pathname] = url.split('?');
  const name = pathname.split('/').pop() ?? PREVIEW_FILE_NAME_FALLBACK;
  const type = extractExt({ str: name });

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    const blob = await response.blob();
    const file = new File([blob], name, { type });
    const { size, lastModified, webkitRelativePath } = file;

    return {
      id,
      name,
      size,
      type,
      lastModified,
      webkitRelativePath,
      blob: URL.createObjectURL(file),
      original: file,
    };
  } catch (e) {
    console.error(e);

    return { id, name, type, url };
  }
};
