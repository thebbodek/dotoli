import { DROPZONE_REJECT_MESSAGE, FILE_DEFAULT_MAX_SIZE } from '@bbodek/hooks';
import { ACCEPT_FILES } from '@bbodek/utils';
import clsx from 'clsx';

import { FILE_UPLOADER_STYLES } from '@/components/FileUploader/constants';
import FileUploaderDescription from '@/components/FileUploader/FileUploaderDescription';
import FileUploaderTitle from '@/components/FileUploader/FileUploaderTitle';
import { FileUploaderProps } from '@/components/FileUploader/types';
import { Typography } from '@/components/Typography';

const FileUploader = ({
  accept = ACCEPT_FILES,
  disabled,
  rejectedFiles,
  max = FILE_DEFAULT_MAX_SIZE,
  rootProps,
  inputProps,
  className,
}: FileUploaderProps) => {
  const getStatusStyles = () => {
    if (rejectedFiles) return FILE_UPLOADER_STYLES.ERROR;

    if (disabled) return FILE_UPLOADER_STYLES.DISABLED;

    return FILE_UPLOADER_STYLES.DEFAULT;
  };

  return (
    <div
      className={clsx(
        className,
        'rounded-in-8 in-flex-v-stack-center in-tablet:py-[1.375rem] w-full border border-dashed px-5 py-4 transition-colors',
        !disabled && FILE_UPLOADER_STYLES.HOVER,
        getStatusStyles(),
      )}
      {...rootProps()}
    >
      <input {...inputProps()} />
      <FileUploaderTitle disabled={disabled} />
      <FileUploaderDescription accept={accept} max={max} />
      {!!rejectedFiles && (
        <Typography color='red-04' variant='body-12-m'>
          {DROPZONE_REJECT_MESSAGE[rejectedFiles.code]}
        </Typography>
      )}
    </div>
  );
};

export default FileUploader;
