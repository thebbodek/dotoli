export const revokeFile = ({ url }: { url: string[] | string }) =>
  Array.isArray(url)
    ? url.forEach((_url) => URL.revokeObjectURL(_url))
    : URL.revokeObjectURL(url);
