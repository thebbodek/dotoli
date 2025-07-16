import { useFirstRenderEffect } from '@/effects';
import { DropzoneState } from '@/hooks/useDropzone/types';
import { revokeFile } from '@/hooks/useDropzone/utils';

const useDropzoneFilesCleanupEffect = ({
  acceptedFiles,
}: Pick<DropzoneState, 'acceptedFiles'>) => {
  useFirstRenderEffect(() => {
    revokeFile({ url: acceptedFiles.map((file) => file['blob']) });
  });
};

export default useDropzoneFilesCleanupEffect;
