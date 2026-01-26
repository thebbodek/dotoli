import { FileDownloadParams } from '@/fileDownload/types';

export const fileDownload = ({ url, name }: FileDownloadParams) => {
  const a = document.createElement('a');

  a.href = url;
  a.download = name;
  a.click();
  a.remove();
};
